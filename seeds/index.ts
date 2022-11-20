import { dataSource } from "../src/app-data-source";
import EventEntity from "../src/entity/events.entity";
import Workshops from "../src/entity/workshops.entity";
import { eventPayloads, workshopPayloads } from "./content";
import { seed } from "./seed";

dataSource.initialize().then(seed).catch(console.log)