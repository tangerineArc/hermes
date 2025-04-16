#! /usr/bin/env node

"use strict";

import "dotenv/config";
import mysql from "mysql2/promise";

const SQL = `
CREATE TABLE IF NOT EXISTS User (
  id INT AUTO_INCREMENT PRIMARY KEY,
  phone_number VARCHAR ( 15 ) NOT NULL UNIQUE,
  password_hash VARCHAR ( 255 ) NOT NULL,
  name VARCHAR ( 255 ) NOT NULL
);

CREATE TABLE IF NOT EXISTS Train (
  number VARCHAR ( 10 ) PRIMARY KEY,
  name VARCHAR ( 255 ) NOT NULL,
  days_running VARCHAR ( 50 ) NOT NULL
);

CREATE TABLE IF NOT EXISTS Station (
  code VARCHAR ( 20 ) PRIMARY KEY,
  name VARCHAR ( 255 ) NOT NULL,
  region VARCHAR ( 255 ) NOT NULL
);

CREATE TABLE IF NOT EXISTS Schedule (
  id INT AUTO_INCREMENT PRIMARY KEY,
  train_number VARCHAR ( 10 ) NOT NULL,
  station_code VARCHAR ( 20 ) NOT NULL,
  arrival_time TIME NOT NULL,
  departure_time TIME NOT NULL,
  distance_covered INT NOT NULL,

  FOREIGN KEY ( train_number ) REFERENCES Train ( number ),
  FOREIGN KEY ( station_code ) REFERENCES Station ( code )
);

CREATE TABLE IF NOT EXISTS Coach (
  id INT AUTO_INCREMENT PRIMARY KEY,
  train_number VARCHAR ( 10 ) NOT NULL,
  coach_number VARCHAR ( 10 ) NOT NULL,
  class ENUM ( '1A', '2A', '3A', '3E', 'EC', 'CC', 'SL', '2S' ) NOT NULL,
  num_seats TINYINT NOT NULL,
  price_per_km DECIMAL ( 10, 2 ) NOT NULL,

  FOREIGN KEY ( train_number ) REFERENCES Train ( number )
);

CREATE TABLE IF NOT EXISTS Seat (
  id INT AUTO_INCREMENT PRIMARY KEY,
  train_number VARCHAR ( 10 ) NOT NULL,
  coach_id INT NOT NULL,
  seat_number TINYINT UNSIGNED NOT NULL,
  journey_date DATE NOT NULL,

  FOREIGN KEY ( train_number ) REFERENCES Train ( number ),
  FOREIGN KEY ( coach_id ) REFERENCES Coach ( id )
);

CREATE TABLE IF NOT EXISTS Ticket (
  pnr VARCHAR ( 10 ) PRIMARY KEY,
  train_number VARCHAR ( 10 ) NOT NULL,
  journey_date DATE NOT NULL,
  booked_at DATETIME DEFAULT NOW() NOT NULL,
  origin_station_code VARCHAR ( 20 ) NOT NULL,
  destination_station_code VARCHAR ( 20 ) NOT NULL,

  FOREIGN KEY ( train_number ) REFERENCES Train ( number ),
  FOREIGN KEY ( origin_station_code ) REFERENCES Station ( code ),
  FOREIGN KEY ( destination_station_code ) REFERENCES Station ( code )
);

CREATE TABLE IF NOT EXISTS Passenger (
  id INT AUTO_INCREMENT PRIMARY KEY,
  seat_id INT,
  ticket_pnr VARCHAR ( 10 ) NOT NULL,
  ticket_booker_id INT NOT NULL,
  name VARCHAR ( 255 ) NOT NULL,
  age TINYINT UNSIGNED NOT NULL,
  gender ENUM ( 'Male', 'Female', 'Other' ) NOT NULL,
  phone_number VARCHAR ( 15 ) NOT NULL,
  status ENUM ( 'WL', 'RAC', 'CNF', 'CANCELLED' ) NOT NULL,
  quota ENUM ( 'GN', 'LD', 'HP', 'SS' ) NOT NULL,

  FOREIGN KEY ( seat_id ) REFERENCES Seat ( id ),
  FOREIGN KEY ( ticket_booker_id ) REFERENCES User ( id )
);

CREATE TABLE IF NOT EXISTS Payment (
  id INT AUTO_INCREMENT PRIMARY KEY,
  paid_at DATETIME DEFAULT NOW() NOT NULL,
  user_id INT NOT NULL,
  ticket_pnr VARCHAR ( 10 ) NOT NULL,
  base_amount DECIMAL ( 10, 2 ) NOT NULL,
  discount DECIMAL ( 10, 2 ) DEFAULT 0 NOT NULL,
  net_amount DECIMAL ( 10, 2 ) NOT NULL,
  is_refund BOOLEAN DEFAULT FALSE NOT NULL,

  FOREIGN KEY ( user_id ) REFERENCES User ( id ),
  FOREIGN KEY ( ticket_pnr ) REFERENCES Ticket ( pnr )
);
`;

async function main() {
  console.log("🔥 preparing schema by the grace of Swagatam ...");

  const connection = await mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    multipleStatements: true,
  });

  await connection.query(SQL);
  await connection.end();

  console.log("... schema prepared by the grace of Swagatam 🔥");
}

main();
