import { useEffect, useState } from 'react';
import { auth, db } from '../firebase-config';
import { doc, getDoc } from 'firebase/firestore';

const Dashboard = () => {
  const [did, setDid] = useState('');

  useEffect(() => {
    if (!auth.currentUser) {
      console.log('No user signed in');
      return;
    }

    const fetchUserDid = async () => {
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        setDid(userDocSnap.data().did);
      } else {
        console.log("No user document found!");
      }
    };

    fetchUserDid();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Your DID: {did}</p>
    </div>
  );
}

export default Dashboard;