import { NextFunction, Request, Response } from "express";
import { listWorkshops, showWorkshop } from "../services/workshops.service";

export async function list(req: Request, res: Response, next: NextFunction) {
    const { eventId } = req.params;
    const workshops = await listWorkshops(parseInt(eventId.toString()));
    return res.send(workshops);
}

export async function show(req: Request, res: Response, next: NextFunction) {
    const { workshopId } = req.params;
    const workshop = await showWorkshop(parseInt(workshopId.toString()));
    if (!workshop) {
        return res.sendStatus(404)
    }
    return res.send(workshop);
}