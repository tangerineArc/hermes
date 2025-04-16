import expressAsyncHandler from "express-async-handler";

import * as db from "../db/queries.js";

const getAllStations = expressAsyncHandler(async (req, res) => {
  const stations = await db.selectAllStations();
  res.json(stations);
});

const getSearchResults = expressAsyncHandler(async (req, res) => {
  const { matcher } = req.query;
  const stations = await db.searchStationsByMatcher({ matcher });
  res.status(200).json(stations);
});

export { getAllStations, getSearchResults };
