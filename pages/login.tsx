import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [did, setDid] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ did, password }),
      });

      if (response.ok) {
        router.push('/useraccount');
      } else {
        throw new Error('Invalid DID or password');
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h1>Login</h1>
      <input type="text" placeholder="DID" value={did} onChange={e => setDid(e.target.value.trim())} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
}