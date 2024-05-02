import { NextApiRequest, NextApiResponse } from 'next';
import { signIn } from '@/auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {

    const { email, password, passwordAgain } = await req.json();
    
    // Validate
    if (password !== passwordAgain) {
      return NextResponse.json({ success: false, message: 'The passwords doesn\'t match.' });
    }
    
    // TODO: Create user in the database

    await signIn('credentials', { email, password });
    return NextResponse.json({ success: true, message: "" });

  } catch (error) {
    return NextResponse.json({ success: false, message: 'Something went wrong.' });
  }
}