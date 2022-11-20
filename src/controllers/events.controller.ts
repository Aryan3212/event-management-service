import { NextFunction, Request, Response } from "express";
import { listEvents, showEvent } from "../services/events.service";


export async function list(req: Request, res: Response, next: NextFunction) {
    let { limit = 2, skip = 0 } = req.query;
    if (limit < 0 || skip < 0) {
        limit = 10;
        skip = 0;
    }
    const [events, pagination] = await listEvents({}, parseInt(limit.toString()), parseInt(skip.toString()));
    return res.send({ events, pagination });
}

export async function show(req: Request, res: Response, next: NextFunction) {
    const { eventId } = req.params;
    const event = await showEvent(parseInt(eventId.toString()));
    return res.send(event);
}


