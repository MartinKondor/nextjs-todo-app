import { sql } from '@vercel/postgres';
import { TodoList, User } from './types';


export async function fetchTodoLists() {
    const response = await fetch('/api/todo-list/list', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        return await response.json()
    } else {
        throw new Error('Failed to fetch todo_list data.');
    }
}

export async function fetchTodoList(id: string) {
    const response = await fetch(`/api/todo-list/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        return await response.json()
    } else {
        throw new Error('Failed to fetch todo_list data.');
    }
}

export async function fetchUser(id: string) {
    const response = await fetch(`/api/user/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        return await response.json()
    } else {
        throw new Error('Failed to fetch user data.');
    }
}
