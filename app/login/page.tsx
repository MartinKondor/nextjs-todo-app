'use client';
import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter();
  const [currentError, setCurrentError] = useState<string | null>(null);
 
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
 
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');
 
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
 
    if (response.ok) {
      console.log(response);
      router.replace('/todo-list');
    } else {
      setCurrentError(response.message as string);
    }
  }
 
  return (
    <main>
        <div className="text-danger">
            {currentError}
        </div>
        <h1 className="h1 fw-bold mt-2 mb-4">
          Login
        </h1>
        <div>
            <form onSubmit={handleSubmit}>
                <input className="form-control" type="email" name="email" placeholder="Email" required />
                <br /><br />
                <input className="form-control" type="password" name="password" placeholder="Password" required />
                <br /><br />
                <button className="btn btn-secondary" type="submit">Login</button>
                <br /><br />
                <a href="/signup">Don{"'"}t have an account?</a>
            </form>
        </div>
    </main>
  );
}
