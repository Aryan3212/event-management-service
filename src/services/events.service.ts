import { MoreThan } from "typeorm";
import { dataSource } from "../app-data-source";
import EventsEntity from "../entity/events.entity";


export async function listEvents(filters = {}, limit = 10, skip = 0) {
    const eventRepo = dataSource.getRepository(EventsEntity);
    const [events, count] = await eventRepo.findAndCount({
        where: {
            start_at: MoreThan(new Date()),
            ...filters
        },
        skip: (skip) * (limit + 1),
        take: limit
    })
    const pagination = {
        total: count,
        per_page: limit,
        total_pages: Math.ceil(count / limit),
        current_page: skip
    }
    return [events, pagination];
}



export async function showEvent(id: number, filters = {}) {
    const eventRepo = dataSource.getRepository(EventsEntity)
    const event = await eventRepo.createQueryBuilder("event")
        .where("event.id = :id", { id })
        .leftJoinAndSelect("event.workshops", "workshop")
        .loadRelationCountAndMap("event.total_workshops", "event.workshops")
        .getOne();
    delete event?.workshops;
    return event;
}
