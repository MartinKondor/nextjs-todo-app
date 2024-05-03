import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { fetchTodoLists, fetchTodoList } from '@/app/data';
import { useParams } from "next/navigation";

export async function GET(
    req: NextApiRequest,
    { params }: { params: { todoListId: string } }
) {
    try {
        const todoListId: string = params.todoListId;
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