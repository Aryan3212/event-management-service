import { dataSource } from "../src/app-data-source";
import EventEntity from "../src/entity/events.entity";
import Reservations from "../src/entity/reservations.entity";
import Workshops from "../src/entity/workshops.entity";
import { eventPayloads, reservationPayloads, workshopPayloads } from "./content";

export async function seed() {
    const eventRepo = dataSource.getRepository(EventEntity);
    const workshopRepo = dataSource.getRepository(Workshops);
    const reservationRepo = dataSource.getRepository(Reservations);
    await reservationRepo.delete({});
    await workshopRepo.delete({});
    await eventRepo.delete({});

    Promise.all(eventPayloads.map(async (event, index) => {
        const newEvent = eventRepo.create(event);
        await eventRepo.save(newEvent);
        const firstWsh = workshopPayloads[index * 2];
        const secondWsh = workshopPayloads[(index * 2) + 1];
        const newFirstWorkshop = workshopRepo.create({ ...firstWsh, event: newEvent });
        const newSecondWorkshop = workshopRepo.create({ ...secondWsh, event: newEvent });
        await workshopRepo.save(newFirstWorkshop);
        await workshopRepo.save(newSecondWorkshop);
        const firstRes = reservationPayloads[0];
        const secondRes = reservationPayloads[1];
        const newFirstRes = reservationRepo.create({ ...firstRes, workshop: newFirstWorkshop });
        const newSecondRes = reservationRepo.create({ ...secondRes, workshop: newSecondWorkshop });
        await reservationRepo.save(newFirstRes);
        await reservationRepo.save(newSecondRes);
    })).then(() => {
        dataSource.destroy();
    })
}
