import "dotenv/config";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import fs from "fs";
import util from "util";

import cardController from "./controllers/metaphoricalCards";
import diaryController from "./controllers/diary";
import { job } from "./cron/notification.cron";
import middlewar from "./middlewars";
import { migrationUp } from "./migrations";
import notificationController from "./controllers/notification";
import userController from "./controllers/user";

const PORT = process.env.PORT || 4000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://db/diary";

const outputLog = fs.createWriteStream(__dirname + "/logger.log", {
    flags: "w",
});
outputLog.write(util.format(new Date(), "test") + "\n");

const connectToMongo = async () => {
    try {
        mongoose.set("strictQuery", false);
        mongoose.connect(MONGO_URL);
        console.log("database is connected");
    } catch (error) {
        console.log("database is not connected");
        process.exit();
    }
};
connectToMongo();

const fileStorage = multer.diskStorage({
    destination: "storage/",
    filename: (req, file, cb) => {
        req.body.file = file.originalname;
        cb(null, file.originalname);
    },
});
const uploadImage = multer({
    storage: fileStorage,
    limits: {
        fileSize: 1000000,
    },
});

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// migrations
app.get("/migration-up", migrationUp);

// user
app.post(
    "/signup",
    middlewar.checkPassword,
    middlewar.checkEmailAndUsername,
    userController.signup
);
app.post("/signin", middlewar.signinMid, userController.signin);
app.post("/signin-google", userController.signinGoogle);
app.get("/user/:id", middlewar.isActive, userController.getUserData);
app.put("/user/:id", middlewar.isActiveForUpdate, userController.putUserData);
app.delete("/user/:id", middlewar.isActive, userController.deactivateUser);
app.get(
    "/forgot-password/:email",
    middlewar.isActive,
    userController.forgotPassword
);
app.patch(
    "/refresh-password/:cipherEmail",
    middlewar.checkPassword,
    middlewar.decipheredEmail,
    userController.refreshPassword
);

// week plan
app.post("/diary/day-plan/:userId", diaryController.postDayPlan);
app.get("/diary/week-plan/:userId/:firstDate", diaryController.getWeekPlan);
app.put("/diary/week-plan/:id", diaryController.putWeekPlan);

// daily page
app.post("/diary/page/:userId/:date", diaryController.postPage);
app.get("/diary/page/:userId/:date", diaryController.getPage);
app.put("/diary/page/:id", diaryController.putPage);

// menstrual cycle
app.post("/diary/menstrual-cycle/:userId", diaryController.postMenstrualCycle);
app.get("/diary/menstrual-cycle/:userId", diaryController.getMenstrualCycle);
app.put("/diary/menstrual-cycle/:id", diaryController.putMenstrualCycle);

// result
app.get("/diary/result/:userId/:month", diaryController.getMonthResults);
app.get("/diary/result/:userId/", diaryController.getTotalResults);

// notification
app.get("/notification/:userId", notificationController.getNotification);
app.put("/notification/:userId", notificationController.putNotification);

// metaphorical cards
app.post("/metaphorical-cards/", cardController.postCard);
app.post(
    "/metaphorical-cards/file",
    uploadImage.array("file", 100),
    cardController.postCardFile
);
app.get("/metaphorical-cards/:deck", cardController.getDeckCards);
app.put("/metaphorical-cards/:deck/:cardId", cardController.putCard);
app.get("/metaphorical-cards/:deck/card", cardController.getCard);
app.get("/:filename", (req, res) => {
    const filePath = req.params.filename;
    res.sendFile(path.resolve(`storage/${filePath}`));
});

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});

job.start();
