import { QueryPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { dataSource } from "../app-data-source";
import Reservations from "../entity/reservations.entity";
import Workshops from "../entity/workshops.entity";


export async function createReservation(name: string, email: string, workshopId: number) {
    const reservationRepo = dataSource.getRepository(Reservations);
    const createdReservation = await reservationRepo.createQueryBuilder("reservation")
        .insert()
        .into(Reservations)
        .values([
            { name, email, workshop: workshopId as QueryPartialEntity<Workshops> },
        ])
        .execute();
    const returnReservation = await reservationRepo.createQueryBuilder("reservation")
        .where("reservation.id = :id", { id: createdReservation.identifiers[0].id })
        .innerJoinAndSelect("reservation.workshop", "workshop")
        .innerJoinAndSelect("workshop.event", "event")
        .getOne();
    const reservation = {
        name: returnReservation?.name,
        id: returnReservation?.id,
        email: returnReservation?.email
    }
    const event = {
        id: returnReservation?.workshop.event.id,
        title: returnReservation?.workshop.event.title,
        start_at: returnReservation?.workshop.event.start_at,
        end_at: returnReservation?.workshop.event.end_at,
    }
    const returnedWorkshop = {
        id: returnReservation?.workshop.id,
        title: returnReservation?.workshop.title,
        description: returnReservation?.workshop.description,
        start_at: returnReservation?.workshop.start_at,
        end_at: returnReservation?.workshop.end_at,
    }
    return {
        reservation,
        event,
        workshop: returnedWorkshop
    };
}