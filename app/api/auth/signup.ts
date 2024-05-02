import { NextApiRequest, NextApiResponse } from 'next';
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { email, password, passwordAgain } = req.body
    // await signIn('credentials', { email, password })
 
    res.status(200).json({ success: true })
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ error: 'Invalid credentials.' })
    } else {
      res.status(500).json({ error: 'Something went wrong.' })
    }
  }
}