import { useState } from 'react';
import { useRouter } from 'next/router';
import { auth, db } from '../firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { DidJwk } from '@web5/dids';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    try {
      // Creating user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid; // Getting the UID of the newly created user
      console.log(`Firebase user created: ${uid}`);

      // Generate a new DID using Web5 library
      const didJwk = await DidJwk.create();
      console.log(`DID generated: ${didJwk.uri}`);

      // Save user data including uid in Firestore under "users" collection
      await setDoc(doc(db, "users", uid), {
        uid: uid,
        email: email,
        did: didJwk.uri
      });

      console.log("User profile created with UID, Email, and DID.");
      router.push('/dashboard'); // Navigate to dashboard after successful registration
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
};

export default Signup;