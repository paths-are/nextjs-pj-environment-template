import type { NextPage } from "next";
import Head from "next/head";
import Container from "@mui/material/Container";
import LogoutButton from "@/sample/components/LogoutButton";
import { useUser } from "@/src/hooks/auth";
import SampleLoginForm from "@/sample/components/SampleLoginForm";
import SampleAfterLoginContainer from "@/sample/components/SampleAfterLoginContainer";

const Home: NextPage = () => {
  const user: any = useUser();

  return (
    <>
      <Head>
        <title>Sample App</title>
        <meta
          name="description"
          content="Next.js + Firebase + Stripe サンプル"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {`モードは「${process.env.NEXT_PUBLIC_MODE}」です`}

      {!user ? ( // ログインしていない場合はログインフォームを表示
        <Container
          sx={{ height: "100vh", display: "flex", alignItems: "center" }}
        >
          <SampleLoginForm />
        </Container>
      ) : (
        // ログインしている場合は操作画面を表示
        <Container
          sx={{ height: "100vh", display: "flex", alignItems: "center" }}
        >
          <Container maxWidth="xs">
            <LogoutButton />
            <p>Hello {user.displayName}</p>
            <SampleAfterLoginContainer />
          </Container>
        </Container>
      )}
    </>
  );
};

export default Home;
