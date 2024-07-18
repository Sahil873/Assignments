import { client } from "..";
/*
 * Function should insert a new todo for this user
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function createTodo(
  userId: number,
  title: string,
  description: string
) {
  const createTodoQuery = `INSERT INTO todos (title, description, user_id)
  VALUES ($1, $2, $3) RETURNING *`;
  const createTodoValues = [title, description, userId];

  const res = await client.query(createTodoQuery, createTodoValues);
  return res.rows[0];
}
/*
 * mark done as true for this specific todo.
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function updateTodo(todoId: number) {
  const updateTodoQuery = `UPDATE todos SET done=true WHERE id=$1 RETURNING *`;
  const updateTodoValues = [todoId];
  const res = await client.query(updateTodoQuery, updateTodoValues);
  return res.rows[0];
}

/*
 *  Get all the todos of a given user
 * Should return an array of todos
 * [{
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }]
 */
export async function getTodos(userId: number) {
  const getTodosQuery = `SELECT * FROM todos WHERE user_id=$1`;
  const getTodosValues = [userId];
  const res = await client.query(getTodosQuery, getTodosValues);
  return res.rows;
}
