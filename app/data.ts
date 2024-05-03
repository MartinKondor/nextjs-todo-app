import { sql } from '@vercel/postgres';
import { TodoList, User } from './types';


export async function fetchTodoLists() {
  try {
    const data = await sql<TodoList>`SELECT * FROM todo_list`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch todo_list data.');
  }
}

export async function fetchTodoList(id: string) {
  try {
    const data = await sql<TodoList>`SELECT * FROM todo_list WHERE id=${id}`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch todo_list data.');
  }
}

export async function fetchUser(id: string) {
  try {
    const data = await sql<User>`SELECT * FROM users WHERE id=${id}`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch users data.');
  }
}
