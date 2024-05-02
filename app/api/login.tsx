import { NextApiRequest, NextApiResponse } from 'next';
import { signIn } from '@/auth';
 
type ResponseData = {
  success: boolean;
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const { email, password } = req.body;
    await signIn('credentials', { email, password });
 
    res.status(200).json({ success: true, message: "" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ success: false, message: 'Invalid credentials.' })
    } else {
      res.status(500).json({ success: false, message: 'Something went wrong.' })
    }
  }
}