import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Web5 } from '@web5/api';
import { useState } from 'react';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>My App</title>
        <meta name="description" content="My App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Social</h1>
        <p className={styles.description}>The Next Era of Social Media</p>
        <ConnectButton></ConnectButton>
        <div className={styles.links}>
          <Link href="/login" className={styles.link}>
            Login
          </Link>
          <Link href="/signup" className={styles.link}>
            Signup
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;