import { NextApiRequest, NextApiResponse } from 'next';
import { signIn } from '@/auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {

    const { email, password, passwordAgain } = await req.json();
    
    // TODO: Create user in the database

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