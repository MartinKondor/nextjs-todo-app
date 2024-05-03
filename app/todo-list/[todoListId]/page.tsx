'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { TodoList } from "@/app/types";
import { fetchTodoList, ResponseTemplate } from "@/app/data-api";

type ErrorState = string | null;

export default function Lists() {
    const params = useParams<{ todoListId: string; }>()
    const todoListId: string = params.todoListId;

    const [todoList, setTodoList] = useState<TodoList | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<ErrorState>(null);

    useEffect(() => {
        if (!todoListId) return; 
        
        async function fetchData() {
            try {
                const resp = await fetchTodoList(todoListId);
                if (resp.success && resp.data && !Array.isArray(resp.data)) {
                    setTodoList(resp.data); 
                } else {
                    setError('Invalid data format received.');
                }
                setLoading(false);
            } catch (error: any) {
                console.error('Failed to fetch the list:', error);
                setError('Failed to load data.');
                setLoading(false);
            }
        }
        fetchData();
    }, [todoListId]);    

    if (loading) return <div className="h3 fw-bold">Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!todoList) return <div>No TODO list found.</div>;

    return (
        <div className="container mt-3">
            <h1 className="h1 fw-bold mt-2 mb-4">TODO List Details</h1>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{todoList.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">List ID: {todoList.id}</h6>
                    <p className="card-text">{todoList.content}</p>
                    <a href={`/user/${todoList.user_id}`} className="card-link">User ID: {todoList.user_id}</a>
                </div>
            </div>
        </div>
    );
}
