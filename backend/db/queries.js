import pool from "./pool.js";

async function selectUserByUsername({ username }) {
  const [rows, fields] = await pool.execute(
    "SELECT * FROM User WHERE username = ?",
    [username]
  );
  return rows;
}

async function selectUserById({ id }) {
  const [rows, fields] = await pool.execute("SELECT * FROM User WHERE id = ?", [
    id,
  ]);
  return rows;
}

async function insertNewUser({ username, passwordHash }) {
  const [rows, fields] = await pool.execute(
    "INSERT INTO User (username, password_hash) VALUES (?, ?)",
    [username, passwordHash]
  );
  return rows;
}

export { insertNewUser, selectUserById, selectUserByUsername };
