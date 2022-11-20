import express from "express";
import { create } from "../controllers/reservations.controller";

const router = express.Router({ mergeParams: true });

router.post('/', create);

export { router as reservationsRouter };