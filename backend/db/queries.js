"use strict";

import pool from "./pool.js";

async function selectUserByPhoneNumber({ phoneNumber }) {
  const [rows] = await pool.execute(
    "SELECT * FROM User WHERE phone_number = ? LIMIT 1",
    [phoneNumber]
  );
  return rows[0];
}

async function selectUserById({ id }) {
  const rows = await pool.execute("SELECT * FROM User WHERE id = ? LIMIT 1", [
    id,
  ]);
  return rows[0];
}

async function insertNewUser({ name, phoneNumber, passwordHash }) {
  const [res] = await pool.execute(
    "INSERT INTO User (name, phone_number, password_hash) VALUES (?, ?, ?)",
    [name, phoneNumber, passwordHash]
  );

  const [rows] = await pool.execute("SELECT * FROM User WHERE id = ?", [
    res.insertId,
  ]);

  return rows[0];
}

async function selectAllStations() {
  const [rows] = await pool.execute("SELECT * FROM Station");
  return rows;
}

async function searchStationsByMatcher({ matcher }) {
  const [rows] = await pool.execute(
    `SELECT * FROM Station
    WHERE
      LOWER(name) = ?
      OR LOWER(code) = ?
      OR LOWER(name) LIKE ?
      OR LOWER(name) LIKE ?
    ORDER BY
      CASE
        WHEN LOWER(name) = ? THEN 1
        WHEN LOWER(code) = ? THEN 2
        WHEN LOWER(name) LIKE ? THEN 3
        WHEN LOWER(name) LIKE ? THEN 4
      END,
      CHAR_LENGTH(name),
      name
    LIMIT 10
    `,
    [
      matcher,
      matcher,
      `${matcher.toLowerCase()}%`,
      `%${matcher.toLowerCase()}%`,
      matcher,
      matcher,
      `${matcher.toLowerCase()}%`,
      `%${matcher.toLowerCase()}%`,
    ]
  );
  return rows;
}

async function selectTrainsForJourney({
  sourceStationCode,
  destinationStationCode,
  day,
  date,
}) {
  const [rows] = await pool.execute(
    `
    SELECT
      grouped.number,
      ANY_VALUE(grouped.name) AS name,
      ANY_VALUE(grouped.days_running) AS days_running,
      ANY_VALUE(grouped.departure_time) AS departure_time,
      ANY_VALUE(grouped.arrival_time) AS arrival_time,
      ANY_VALUE(grouped.total_distance) AS total_distance,
      ANY_VALUE(grouped.num_halts) AS num_halts,
      grouped.class,
      ANY_VALUE(grouped.price_per_km) AS price_per_km,
      ( SUM(grouped.num_seats) - COUNT(passenger.id) ) AS available_seats
    FROM (
      SELECT DISTINCT
        t.number,
        t.name,
        t.days_running,
        s1.departure_time,
        s2.arrival_time,
        ( s2.distance_covered - s1.distance_covered ) AS total_distance,
        (
          SELECT COUNT(*) FROM Schedule s
          WHERE s.train_number = t.number
            AND s.distance_covered > s1.distance_covered
            AND s.distance_covered < s2.distance_covered
        ) AS num_halts,
        c.class,
        c.price_per_km,
        c.id AS coach_id,
        c.num_seats
      FROM Train t
      JOIN Schedule s1 ON t.number = s1.train_number
      JOIN Schedule s2 ON t.number = s2.train_number
      JOIN Coach c ON c.train_number = t.number
      WHERE
        t.days_running LIKE ?
        AND s1.station_code = ?
        AND s2.station_code = ?
        AND s1.distance_covered < s2.distance_covered
    ) AS grouped
    LEFT JOIN Seat seat ON seat.coach_id = grouped.coach_id AND seat.journey_date = ?
    LEFT JOIN Passenger passenger ON passenger.seat_id = seat.id AND passenger.status = 'CNF'
    GROUP BY grouped.number, grouped.class
    ORDER BY grouped.number, FIELD(grouped.class, '1A', '2A', '3A', '3E', 'EC', 'CC', 'SL', '2S')
    `,
    [`%${day}%`, sourceStationCode, destinationStationCode, date]
  );

  return rows;
}

// async function addPassengerDetails({  })

export {
  insertNewUser,
  searchStationsByMatcher,
  selectAllStations,
  selectTrainsForJourney,
  selectUserById,
  selectUserByPhoneNumber,
};
