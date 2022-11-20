import { Server } from "http";
import request from "supertest";

import { eventPayloads, workshopPayloads, reservationPayloads } from "../seeds/content";
import { seed } from "../seeds/seed";

import { app } from "../src/app";
import { dataSource } from "../src/app-data-source";
import EventEntity from "../src/entity/events.entity";
import log from "../src/utils/logger";




let server: Server;
const port = 3000;

describe("Server integration testing", () => {
  beforeAll(async () => {
    await dataSource.initialize().then(seed);
    server = app.listen(port, () => {
      log.info(`⚡️[server]: Server is running at https://localhost:${port}`);
    });

  });
  afterAll(async () => {
    server.close(() => {
      log.debug('HTTP server closed')
    });
    await dataSource.destroy();
  })
  describe("Test server.ts", () => {
    test("Healthcheck route", async () => {
      const res = await request(app).get("/healthcheck");
      expect(res.status).toEqual(200);
    });
  });

  describe("Events routes", () => {

    it('should return events that are active with pagination', async () => {
      const res = await request(server).get('/events');
      expect(res).toBe(3);
    })
    it('should return event with total number of workshops', async () => {
      const eventId = 1;
      const res = await request(server).get(`/events/${eventId}`);
      expect(res.status).toBe(200);
    })
  });

  describe("Workshop routes", () => {
    it('should return workshops that are active in a particular event', async () => {
      const eventId = 1;
      const res = await request(server).get(`/events/${eventId}/workshops`);
      expect(res.status).toBe(200);
    })
    it('should return workshop with total number of reservations', async () => {
      const eventId = 1;
      const workshopId = 1;
      const res = await request(server).get(`/events/${eventId}/workshops/${workshopId}`);
      expect(res.status).toBe(200);
    })

  });
  describe("Reservation routes", () => {
    it('should return posted reservation along with the event and workshop', async () => {
      const eventId = 1;
      const workshopId = 1;
      const res = await request(server).post(`/events/${eventId}/workshops/${workshopId}/reservations`);
      expect(res.status).toBe(200);
    })
  })
});