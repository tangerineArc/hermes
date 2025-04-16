"use strict";

import { Router } from "express";

import { getTrainsForJourney } from "../controllers/trains-controller.js";

const trainsRouter = Router();

trainsRouter.post("/journey", getTrainsForJourney);

export default trainsRouter;
