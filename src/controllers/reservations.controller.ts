import { NextFunction, Request, Response } from "express";
import { createReservation } from "../services/reservations.service";

export async function create(req: Request, res: Response, next: NextFunction) {
    const { eventId, workshopId } = req.params;
    const { name, email } = req.body;
    const reservationResponse = await createReservation(name, email, parseInt(workshopId.toString()));
    return res.send(reservationResponse);
}

