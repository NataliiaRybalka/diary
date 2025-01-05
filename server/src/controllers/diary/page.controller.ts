import { Request, Response } from "express";

import PageSchema from "../../db/diary/page.schema";

export const postPage = async (req: Request, res: Response) => {
    const { date, userId } = req.params;
    const { pageData } = req.body;

    try {
        const month = `${date.split("-")[0]}-${date.split("-")[1]}`;
        const page = await PageSchema.create({
            date,
            month,
            ...pageData,
            userId,
        });
        res.status(201).json(page);
    } catch (e) {
        return res.status(400).json(e);
    }
};

export const getPage = async (req: Request, res: Response) => {
    const { date, userId } = req.params;

    try {
        const page = await PageSchema.findOne({ date, userId });
        res.status(200).json(page);
    } catch (e) {
        res.status(404).json("Not found");
    }
};

export const putPage = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { pageData } = req.body;

    try {
        await PageSchema.updateOne({ _id: id }, { ...pageData });
        const page = await PageSchema.findById(id);

        return res.status(201).json(page);
    } catch (e) {
        res.status(400).json(e);
    }
};
