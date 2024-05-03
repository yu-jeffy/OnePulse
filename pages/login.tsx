import { useState } from 'react';
import { useRouter } from 'next/router';
import { auth, db, googleProvider } from '../firebase-config'; // auth is already initialized
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (error: any) {
      console.error("Error logging in:", error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user.additionalUserInfo.isNewUser) {
        const didJwk = await didJwk.create();
        await db.collection("users").doc(result.user.uid).set({
          email: result.user.email,
          did: didJwk.uri
        });
      }
      router.push('/dashboard');
    } catch (error: any) {
      console.error("Google Sign-In error:", error.message);
    }
  };

  return (
    <div>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
    </div>
  );
};

export default Login;