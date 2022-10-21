import express, { Request, Response } from "express";

export const healthCheckRoute = express.Router();

healthCheckRoute.get("/", async (req: Request, res: Response) => {
    res.status(200);
    res.send({
        status: "available"
    });
});