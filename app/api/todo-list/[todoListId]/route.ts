import { NextApiRequest, NextApiResponse, NextRouter } from 'next';
import { NextResponse } from 'next/server';
import { fetchTodoLists, fetchTodoList } from '@/app/data';

export async function GET(req: NextApiRequest) {
    try {
        // TODO: Get the ID from the slug
        const todoListId = "";

        return NextResponse.json({
            success: true,
            message: "",
            data: await fetchTodoList(todoListId)
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: `Something went wrong: ${error}`
        });
    }
}