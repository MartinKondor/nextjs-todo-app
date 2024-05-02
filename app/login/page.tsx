'use client';
import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
 
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')
 
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
 
    if (response.ok) {
      router.replace('/lists');
    } else {
      // TODO: Handle errors
    }
  }
 
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-2 lg:text-left">
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" required />
                <br /><br />
                <input type="password" name="password" placeholder="Password" required />
                <br /><br />
                <button type="submit">Login</button>
                <br /><br />
                <a href="/signup">Don{"'"}t have an account?</a>
            </form>
        </div>
    </main>
  );
}
