'use client';
import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const router = useRouter();
 
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
 
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');
    const passwordAgain = formData.get('passwordAgain');
 
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, passwordAgain }),
    });
 
    if (response.ok) {
      console.log(response);
      router.replace('/todo-list');
    } else {
      // TODO: Handle errors
    }
  }
 
  return (
    <main>
        <div>
            <h1 className="h1 fw-bold mt-2 mb-4">
              Signup
            </h1>
        </div>

        <div>
            <form onSubmit={handleSubmit}>
                <input className="form-control" type="email" name="email" placeholder="Email" required />
                <br /><br />
                <input className="form-control" type="password" name="password" placeholder="Password" required />
                <br /><br />
                <input className="form-control" type="passwordAgain" name="password" placeholder="Password" required />
                <br /><br />
                <button className="btn btn-secondary" type="submit">Signup</button>
                <br /><br />
                <a href="/login">Already have an account?</a>
            </form>
        </div>
    </main>
  );
}
