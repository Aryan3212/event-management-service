import { DataSource } from "typeorm"
import EventsEntity from "./entity/events.entity"
import Reservations from "./entity/reservations.entity"
import Workshops from "./entity/workshops.entity"

export const dataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "password",
    database: "dev_event_management",
    entities: [EventsEntity, Workshops, Reservations],
    logging: true,
    synchronize: true,
})