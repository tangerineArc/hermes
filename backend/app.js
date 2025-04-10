"use strict";

import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import passport from "passport";

import authStrategy from "./auth-config/strategy.js";

import authRouter from "./routes/auth-router.js";
import indexRouter from "./routes/index-router.js";

const app = express();

const PORT = process.env.PORT || 3000;

/* handle cross-origin requests */
app.use(
  cors({
    origin: JSON.parse(process.env.ALLOWED_ORIGINS),
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.options("*", cors());

/* cookie parsing middleware */
app.use(cookieParser());

/* data parsing middleware */
app.use(express.json()); // parse json data
app.use(express.urlencoded({ extended: true })); // parse formdata

/* set up passport */
passport.use(authStrategy);

/* routes */
app.use("/", indexRouter);
app.use("/auth", authRouter);

/* non-existent routes handler */
app.all("*", (req, res) => {
  res.status(404).json({ success: false, errors: ["Resource not found"] });
});

/* error-handling middleware */
app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(500).send(err.message);
});

/* startup */
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} ...`);
});
