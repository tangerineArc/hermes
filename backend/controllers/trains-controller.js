"use strict";

import expressAsyncHandler from "express-async-handler";

import * as db from "../db/queries.js";

const getTrainsForJourney = expressAsyncHandler(async (req, res) => {
  const { date, sourceStationCode, destinationStationCode, day } = req.body;

  const rows = await db.selectTrainsForJourney({
    date,
    sourceStationCode,
    destinationStationCode,
    day,
  });

  const trains = {};
  for (const row of rows) {
    if (!trains[row.number]) {
      trains[row.number] = {
        number: row.number,
        name: row.name,
        days_running: row.days_running,
        departure_time: row.departure_time,
        arrival_time: row.arrival_time,
        total_distance: row.total_distance,
        num_halts: row.num_halts,
        seat_availability: {},
      };
    }

    const fare = Number((row.total_distance * row.price_per_km).toFixed(2));

    trains[row.number].seat_availability[row.class] = {
      available_seats: row.available_seats,
      fare,
    };
  }

  res.status(200).send(Object.values(trains));
});

export { getTrainsForJourney };
