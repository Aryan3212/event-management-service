import { dataSource } from "../app-data-source";
import EventsEntity from "../entity/events.entity";
import Workshops from "../entity/workshops.entity";

export async function listWorkshops(id: number) {
    const eventRepo = dataSource.getRepository(EventsEntity)
    const event = await eventRepo.createQueryBuilder("event")
        .where("event.id = :id", { id })
        .leftJoinAndSelect("event.workshops", "workshop", "workshop.start_at > NOW()")

        .getOne();
    return event;
}

export async function showWorkshop(id: number, filters = {}) {
    const workshopRepo = dataSource.getRepository(Workshops)
    const workshop = await workshopRepo.createQueryBuilder("workshop")
        .where("workshop.id = :id", { id })
        .leftJoinAndSelect("workshop.reservations", "reservation")
        .loadRelationCountAndMap("workshop.total_reservation", "workshop.reservations")
        .getOne();
    delete workshop?.reservations;
    return workshop;
}