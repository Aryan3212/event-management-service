import "reflect-metadata";
import { Repository } from "typeorm";
import { dataSource } from "../../src/app-data-source";
import EventEntity from "../../src/entity/events.entity";

let entityRepository: Repository<EventEntity>;
const newEventPayload = {
  title: 'Aryan',
  start_at: new Date(),
  end_at: new Date(Date.now() + 2000000)
}

describe("Event entity", () => {
  beforeAll(async () => {
    await dataSource
      .initialize()
      .then(async () => {
        console.log('arstrsatrastsra');
        entityRepository = dataSource.getRepository(EventEntity);
        const newEvent = entityRepository.create(newEventPayload);
        console.log('arstrsatrastsra213');
        return await entityRepository.save(newEvent);
      })
      .catch((err: Error) => {
        console.error("Error during Data Source initialization:", err)
      })


  })
  afterAll(async () => {
    await entityRepository.delete({});
    await dataSource.destroy();
  })
  it('retrieve event', async () => {
    const retrievedEvent = await entityRepository.findOne({ where: { title: 'aryan' } })
    expect(retrievedEvent?.title).toBe('aryan');
  })
});