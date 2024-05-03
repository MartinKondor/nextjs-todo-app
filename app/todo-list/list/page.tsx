'use client';
import { useEffect, useState } from 'react';
import { TodoList } from "@/app/types";
import { fetchTodoLists } from "@/app/data-api";
type ErrorState = string | null;

export default function Lists() {
    const [todoLists, setTodoLists] = useState<TodoList[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<ErrorState>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const lists = await fetchTodoLists();
                setTodoLists(lists);
                setLoading(false);
            } catch (error: any) {
                console.error('Failed to fetch lists:', error);
                setError('Failed to load data.');
                setLoading(false);
            }
        }
        fetchData();
    }, []); 

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mt-3">
            <h2>Todo Lists</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User ID</th>
                        <th>Title</th>
                        <th>Content</th>
                    </tr>
                </thead>
                <tbody>
                    {todoLists.map(list => (
                        <tr key={list.id}>
                            <td>{list.id}</td>
                            <td>{list.user_id}</td>
                            <td>{list.title}</td>
                            <td>{list.content}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
