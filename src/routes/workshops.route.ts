import express from "express";
import { list, show } from "../controllers/workshops.controller";
import { reservationsRouter } from "./reservations.route";

const router = express.Router({ mergeParams: true });

router.use('/:workshopId/reservations', reservationsRouter);
router.route('/:workshopId')
    .get(show);
router.get('/', list);

export { router as workshopsRouter };
