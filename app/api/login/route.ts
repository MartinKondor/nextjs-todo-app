import { NextApiRequest, NextApiResponse } from 'next';
import { signIn } from '@/auth';
import { NextResponse } from 'next/server';
 
type ResponseData = {
  success: boolean;
  message: string;
}

export async function POST(req: Request) {
  try {

    const { email, password } = await req.json();
    await signIn('credentials', { email, password });
    return NextResponse.json({ success: true, message: "" });

  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, message: 'Invalid credentials.' })
    } else {
      return NextResponse.json({ success: false, message: 'Something went wrong.' })
    }
  }
}