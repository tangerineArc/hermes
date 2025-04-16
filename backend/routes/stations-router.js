import { Router } from "express";

import {
  getAllStations,
  getSearchResults,
} from "../controllers/stations-controller.js";

const stationsRouter = Router();

stationsRouter.get("/", getAllStations);
stationsRouter.get("/search", getSearchResults);

export default stationsRouter;
