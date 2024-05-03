'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { User } from "@/app/types";
import { fetchUser } from "@/app/data-api";

type ErrorState = string | null;

export default function UserView() {
    const params = useParams<{ userId: string; }>()
    const userId: string = params.userId;

    const [viewedUser, setViewedUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<ErrorState>(null);

    useEffect(() => {
        if (!userId) return; 
        
        async function fetchData() {
            try {
                const resp = await fetchUser(userId);
                if (resp.success && resp.data && !Array.isArray(resp.data)) {
                    setViewedUser(resp.data); 
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
    }, [userId]);    

    if (loading) return <div className="h3 fw-bold">Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!viewedUser) return <div>No user found.</div>;

    return (
        <div className="container mt-3">
            <h1 className="h1 fw-bold mt-2 mb-4">User Details</h1>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{viewedUser.name}</h5>
                    <h6 className="card-subtitle mb-2">{viewedUser.email}</h6>
                </div>
            </div>
        </div>
    );
}
