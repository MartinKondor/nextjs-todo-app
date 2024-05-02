import { NextApiRequest, NextApiResponse } from 'next';
import { signIn } from '@/auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { todoListId, title, content } = await req.json();
        
        // TODO

        return NextResponse.json({ success: true, message: "" });

    } catch (error) {
        return NextResponse.json({ success: false, message: 'Something went wrong.' });
    }
}