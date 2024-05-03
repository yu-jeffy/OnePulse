import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Web5 } from '@web5/api';
import { useState } from 'react';

export default function CreateDID() {
  const [did, setDid] = useState('');

  const handleCreateDid = async () => {
    const response = await fetch('/api/create-did', { method: 'POST' });
    const data = await response.json();
    if (response.ok) {
      setDid(data.didUri);
    } else {
      alert('Failed to create DID');
    }
  };

  return (
    <div>
      <h1>Welcome to DID-based Authentication</h1>
      <button onClick={handleCreateDid}>Create DID</button>
      {did && <p>Your DID: {did}</p>}
    </div>
  );
}