'use client';
import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
 
export default function SignupPage() {
    const router = useRouter()
 
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');
    const passwordAgain = formData.get('password-again');
 
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, passwordAgain }),
    })
 
    if (response.ok) {
      router.push('/profile')
    } else {
      // Handle errors
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
                <input type="password" name="password-again" placeholder="Password again" required />
                <br /><br />
                <button type="submit">Sign up</button>
                <br /><br />
                <a href="/login">Already have an account?</a>
            </form>
        </div>
    </main>
  );
}
