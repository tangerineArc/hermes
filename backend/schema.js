#! /user/bin/env node

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
  name VARCHAR ( 255 ) NOT NULL
);

CREATE TABLE IF NOT EXISTS Station (
  code VARCHAR ( 20 ) PRIMARY KEY,
  name VARCHAR ( 255 ) NOT NULL,
  region VARCHAR ( 10 ) NOT NULL
);

CREATE TABLE IF NOT EXISTS Schedule (
  id INT AUTO_INCREMENT PRIMARY KEY,
  train_number VARCHAR ( 10 ) NOT NULL,
  station_code VARCHAR ( 20 ) NOT NULL,
  day_number TINYINT UNSIGNED NOT NULL,
  arrival_time DATETIME NOT NULL,
  departure_time DATETIME NOT NULL,
  distance_covered INT NOT NULL,
  FOREIGN KEY ( train_number ) REFERENCES Train ( number ),
  FOREIGN KEY ( station_code ) REFERENCES Station ( code )
);

CREATE TABLE IF NOT EXISTS Seat (
  id INT AUTO_INCREMENT PRIMARY KEY,
  train_number VARCHAR ( 10 ) NOT NULL,
  coach_number VARCHAR ( 10 ) NOT NULL,
  seat_number TINYINT UNSIGNED NOT NULL,
  class ENUM ( '1A', '2A', '3A', '3E', 'EC', 'CC', 'SL', '2S', 'GN' ) NOT NULL,
  availability_status BIT ( 1 ) DEFAULT 1 NOT NULL,
  base_price DECIMAL ( 10, 2 ) NOT NULL,
  FOREIGN KEY ( train_number ) REFERENCES Train ( number )
);

CREATE TABLE IF NOT EXISTS Ticket (
  pnr VARCHAR ( 10 ) PRIMARY KEY,
  train_number VARCHAR ( 10 ) NOT NULL,
  journey_date DATE NOT NULL,
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
  status ENUM ( 'GNWL', 'TQWL', 'RAC', 'CNF' ) NOT NULL,
  quota ENUM ( 'GN', 'TQ', 'LD', 'HP', 'SS', 'NIL' ) NOT NULL,
  FOREIGN KEY ( seat_id ) REFERENCES Seat ( id ),
  FOREIGN KEY ( ticket_pnr ) REFERENCES Ticket ( pnr )
);

CREATE TABLE IF NOT EXISTS Payment (
  id INT AUTO_INCREMENT PRIMARY KEY,
  paid_at DATETIME DEFAULT NOW() NOT NULL,
  user_id INT NOT NULL,
  ticket_pnr VARCHAR ( 10 ) NOT NULL,
  base_amount DECIMAL ( 10, 2 ) NOT NULL,
  discount DECIMAL ( 10, 2 ) DEFAULT 0 NOT NULL,
  net_amount DECIMAL ( 10, 2 ) NOT NULL,
  is_refund BIT ( 1 ) DEFAULT 0 NOT NULL,
  FOREIGN KEY ( user_id ) REFERENCES User ( id ),
  FOREIGN KEY ( ticket_pnr ) REFERENCES Ticket ( pnr )
);
`;

async function main() {
  console.log("preparing schema by the grace of Swagatam ...");

  const connection = await mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    multipleStatements: true,
    enableKeepAlive: false,
  });

  await connection.query(SQL);
  await connection.end();

  console.log("... schema prepared by the grace of Swagatam");
}

main();
