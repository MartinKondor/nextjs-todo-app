'use client';
import { useEffect, useState } from 'react';
import { TodoList } from "@/app/types";
import { fetchTodoLists, ResponseTemplate } from "@/app/data-api";
type ErrorState = string | null;

export default function Lists() {
    const [todoLists, setTodoLists] = useState<TodoList[]>([]);
    const [response, setResponse] = useState<ResponseTemplate>({success: false, message: "no response", data: null});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<ErrorState>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const resp = await fetchTodoLists();
                setResponse(resp);
                if (resp.success && resp.data) {
                    setTodoLists(resp.data); // Using data directly from the fetch
                }
                setLoading(false);
            } catch (error: any) {
                console.error('Failed to fetch lists:', error);
                setError('Failed to load data.');
                setLoading(false);
            }
        }
        fetchData();
    }, []);     

    if (loading) return <div className="h3 fw-bold">Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mt-3">
            <h1 className="h1 fw-bold mt-2 mb-4">
                TODOs
            </h1>
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
                    {todoLists && todoLists.length > 0 ? (todoLists.map(list => (
                        <tr key={list.id}>
                            <td className='small'>
                                <a href={`/todo-list/${list.id}`}>
                                    {list.user_id}
                                </a>
                            </td>
                            <td className='small'>
                                <a href={`/user/${list.user_id}`}>
                                    {list.user_id}
                                </a>
                            </td>
                            <td>{list.title}</td>
                            <td>{list.content}</td>
                        </tr>
                    ))) : null}
                </tbody>
            </table>
        </div>
    );
}
