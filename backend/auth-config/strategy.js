"use strict";

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { ExtractJwt, Strategy } from "passport-jwt";

import * as db from "../db/queries.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const PUBLIC_KEY = readFileSync(
  join(__dirname, "keys", "public-key.pem"),
  "utf8"
);

async function verifyCallback(payload, done) {
  const user = await db.selectUserById({ id: payload.sub })

  try {
    if (!user) {
      return done(null, false, { message: "Invalid token" });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}

const authStrategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromExtractors([
      (req) => (req && req.cookies ? req.cookies.token : null),
    ]),
    secretOrKey: PUBLIC_KEY,
    algorithms: ["RS256"],
  },
  verifyCallback
);

export default authStrategy;
