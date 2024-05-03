import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Signup() {
  const [password, setPassword] = useState('');
  const [did, setDid] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
        credentials: 'include', // Important for cookies to be handled correctly
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      setDid(data.did); // Save DID on successful signup
      router.push('/dashboard'); // Redirects user to dashboard
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSignup}>
        <h1>Signup</h1>
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Signup</button>
        {error && <p>{error}</p>}
        {did && (
          <div>
            <h2>Your DID</h2>
            <p>{did}</p>
            <p>Please save this DID safely. You'll need it to log in.</p>
          </div>
        )}
      </form>
    </div>
  );
}