import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { fetchTodoLists } from '@/app/data';

export async function GET(req: Request) {
    try {
        return NextResponse.json({ success: true, message: "", data: await fetchTodoLists() });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Something went wrong.' });
    }
}