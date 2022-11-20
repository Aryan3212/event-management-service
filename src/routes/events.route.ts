import express from "express";
import { list, show } from "../controllers/events.controller";
import { workshopsRouter } from "./workshops.route";

const router = express.Router();

router.use('/events/:eventId/workshops/', workshopsRouter);
router.get('/events/:eventId', show);
router.get('/events', list);

export { router as eventsRouter };