import { client } from "..";

/*
 * Should insert into the users table
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function createUser(
  username: string,
  password: string,
  name: string
) {
  const createUserQuery = `INSERT INTO users (username, password, name)
    VALUES ($1, $2, $3) RETURNING *`;
  const userValues = [username, password, name];

  const res = await client.query(createUserQuery, userValues);
  return res.rows[0];
}

/*
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function getUser(userId: number) {
  const getUserQuery = `SELECT * FROM users WHERE id=$1 `;
  const getUserValues = [userId];

  const res = await client.query(getUserQuery, getUserValues);
  return res.rows[0];
}
