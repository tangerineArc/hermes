#! /usr/bin/env node

"use strict";

import { createReadStream } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import "dotenv/config";
import mysql from "mysql2/promise";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const stationsDataFilePath = join(__dirname, "data", "stations-data.csv");
const trainsDataFilePath = join(__dirname, "data", "trains-data.csv");
const schedulesDataFilePath = join(__dirname, "data", "schedules-data.csv");
const coachesDataFilePath = join(__dirname, "data", "coaches-data.csv");

const SQL = `
SET GLOBAL local_infile = 1;

LOAD DATA LOCAL INFILE '${stationsDataFilePath}'
INTO TABLE Station
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
LINES TERMINATED BY '\n' IGNORE 1 LINES
( code, name, region );

LOAD DATA LOCAL INFILE '${trainsDataFilePath}'
INTO TABLE Train
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
LINES TERMINATED BY '\n' IGNORE 1 LINES
( number, name, days_running );

LOAD DATA LOCAL INFILE '${schedulesDataFilePath}'
INTO TABLE Schedule
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
LINES TERMINATED BY '\n' IGNORE 1 LINES
( train_number, station_code, arrival_time, departure_time, distance_covered );

LOAD DATA LOCAL INFILE '${coachesDataFilePath}'
INTO TABLE Coach
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
LINES TERMINATED BY '\n' IGNORE 1 LINES
( train_number, coach_number, class, num_seats, price_per_km );
`;

main();

async function main() {
  console.log("🌱 seeding database by the grace of Swagatam ...");

  const connection = await mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    multipleStatements: true,
    infileStreamFactory: (filePath) => {
      return createReadStream(filePath);
    },
  });

  await connection.query(SQL);
  await connection.end();

  console.log("🌱 ... seeded database by the grace of Swagatam");
}
