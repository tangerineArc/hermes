"use strict";

import { body } from "express-validator";

import * as db from "../db/queries.js";

const validateUser = [
  body("phoneNumber")
    .trim()
    .isLength({ min: 10, max: 15 })
    .withMessage(
      "Phone number must be at least 10 characters and at most 15 characters long"
    )
    .custom(async (phoneNumber) => {
      const user = await db.selectUserByPhoneNumber({ phoneNumber });

      if (user) {
        throw new Error("Provided phone number has already been registered");
      }
      return true;
    }),
  body("name")
    .trim()
    .isLength({ min: 3, max: 255 })
    .withMessage(
      "Name must be at least 3 characters long and at most 255 characters long"
    ),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

export default validateUser;
