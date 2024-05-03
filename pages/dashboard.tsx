import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Fetch user info from API
    const fetchUser = async () => {
      const response = await fetch('/api/user', { credentials: 'include' });
      if (!response.ok) {
        console.error('Failed fetching user data');
        router.push('/login'); // Automatically redirect to login if not authenticated
        return;
      }
      const userData = await response.json();
      setUser(userData);
      setLoading(false);
    };

    fetchUser();
  }, [router]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1>User Dashboard</h1>
      <p>Welcome, {user ? user.username : 'Guest'}</p>
      {user && user.did && <p>Your DID: {user.did}</p>}
      <button onClick={() => router.push('/login')}>Logout</button>
    </div>
  );
}