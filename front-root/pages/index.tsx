import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "@/src/styles/Home.module.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useRecoilValue } from "recoil";
import { sampleAtomValue } from "@/src/recoilStates";

import LogoutButton from "@/src/components/LogoutButton";
import { useUser } from "@/src/hooks/auth";
import LoginForm from "@/src/components/LoginForm";

const Home: NextPage = () => {
  const user: any = useUser();
  const sampleAtom = useRecoilValue(sampleAtomValue);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!user ? (
        <>
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LoginForm />
          </div>
        </>
      ) : (
        <>
          <LogoutButton />
          <p>Hello {user.displayName}</p>
        </>
      )}
      <main className={styles.main}>
        {sampleAtom} <br />
        <Stack spacing={2} direction="row">
          <Button variant="contained">MUI Contained Button</Button>
        </Stack>
        <Link href="/about">about</Link>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
