import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { fetchUser } from '@/app/data';
import { useParams } from "next/navigation";

export async function GET(
    req: NextApiRequest,
    { params }: { params: { userId: string } }
) {
    try {
        const userId: string = params.userId;
        return NextResponse.json({
            success: true,
            message: "",
            data: await fetchUser(userId)
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: `Something went wrong: ${error}`
        });
    }
}