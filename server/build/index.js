"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("util"));
const metaphoricalCards_1 = __importDefault(require("./controllers/metaphoricalCards"));
const diary_1 = __importDefault(require("./controllers/diary"));
const notification_cron_1 = require("./cron/notification.cron");
const middlewars_1 = __importDefault(require("./middlewars"));
const migrations_1 = require("./migrations");
const notification_1 = __importDefault(require("./controllers/notification"));
const user_1 = __importDefault(require("./controllers/user"));
const PORT = process.env.PORT || 4000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://db/diary';
const outputLog = fs_1.default.createWriteStream(__dirname + '/logger.log', { flags: 'w' });
outputLog.write(util_1.default.format(new Date(), 'test') + '\n');
const connectToMongo = async () => {
    try {
        mongoose_1.default.set('strictQuery', false);
        mongoose_1.default.connect(MONGO_URL);
        console.log('database is connected');
    }
    catch (error) {
        console.log('database is not connected');
        process.exit();
    }
};
connectToMongo();
const fileStorage = multer_1.default.diskStorage({
    destination: 'storage/',
    filename: (req, file, cb) => {
        req.body.file = file.originalname;
        cb(null, file.originalname);
    }
});
const uploadImage = (0, multer_1.default)({
    storage: fileStorage,
    limits: {
        fileSize: 1000000
    },
});
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
// migrations
app.get('/migration-up', migrations_1.migrationUp);
// user
app.post('/signup', middlewars_1.default.checkPassword, middlewars_1.default.checkEmailAndUsername, user_1.default.signup);
app.post('/signin', middlewars_1.default.signinMid, user_1.default.signin);
app.post('/signin-google', user_1.default.signinGoogle);
app.get('/user/:id', middlewars_1.default.isActive, user_1.default.getUserData);
app.put('/user/:id', middlewars_1.default.isActiveForUpdate, user_1.default.putUserData);
app.delete('/user/:id', middlewars_1.default.isActive, user_1.default.deactivateUser);
app.get('/forgot-password/:email', middlewars_1.default.isActive, user_1.default.forgotPassword);
app.patch('/refresh-password/:cipherEmail', middlewars_1.default.checkPassword, middlewars_1.default.decipheredEmail, user_1.default.refreshPassword);
// week plan
app.post('/diary/day-plan/:userId', diary_1.default.postDayPlan);
app.get('/diary/week-plan/:userId/:firstDate', diary_1.default.getWeekPlan);
app.put('/diary/week-plan/:id', diary_1.default.putWeekPlan);
// daily page
app.post('/diary/page/:userId/:date', diary_1.default.postPage);
app.get('/diary/page/:userId/:date', diary_1.default.getPage);
app.put('/diary/page/:id', diary_1.default.putPage);
// menstrual cycle
app.post('/diary/menstrual-cycle/:userId', diary_1.default.postMenstrualCycle);
app.get('/diary/menstrual-cycle/:userId', diary_1.default.getMenstrualCycle);
app.put('/diary/menstrual-cycle/:id', diary_1.default.putMenstrualCycle);
// result
app.get('/diary/result/:userId/:month', diary_1.default.getMonthResults);
app.get('/diary/result/:userId/', diary_1.default.getTotalResults);
// notification
app.get('/notification/:userId', notification_1.default.getNotification);
app.put('/notification/:userId', notification_1.default.putNotification);
// metaphorical cards
app.post('/metaphorical-cards/', metaphoricalCards_1.default.postCard);
app.post('/metaphorical-cards/file', uploadImage.array('file', 100), metaphoricalCards_1.default.postCardFile);
app.get('/metaphorical-cards/:deck', metaphoricalCards_1.default.getDeckCards);
app.put('/metaphorical-cards/:deck/:cardId', metaphoricalCards_1.default.putCard);
app.get('/metaphorical-cards/:deck/card', metaphoricalCards_1.default.getCard);
app.get('/:filename', (req, res) => {
    const filePath = req.params.filename;
    res.sendFile(path_1.default.resolve(`storage/${filePath}`));
});
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
notification_cron_1.job.start();
