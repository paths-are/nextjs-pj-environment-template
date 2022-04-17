import React, { useState } from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "@/src/utils/mui/theme";
import createEmotionCache from "@/src/utils/mui/createEmotionCache";
import { RecoilRoot } from "recoil";
import { getAnalytics } from "firebase/analytics";
import { app } from "@/src/utils/initFirebase";
import { useAuth } from "@/src/hooks/auth";
import { fetchToken, onMessageListener } from "@/src/utils/firebaseWebPush";

if (typeof window !== "undefined") {
  getAnalytics(app);
}

const Notify = () => {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  // const [isTokenFound, setTokenFound] = useState(false);
  const [isTokenFound, setTokenFound] = useState<string | null>(null);
  fetchToken(setTokenFound);
  onMessageListener()
    .then((payload: any) => {
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
      setShow(true);
      alert(payload.notification.body);
      console.log(payload);
    })
    .catch((err: any) => console.log("failed: ", err));
  return isTokenFound ? (
    <h1> Notification permission enabled 👍🏻 token is : {isTokenFound} </h1>
  ) : (
    <h1> Need notification permission ❗️ </h1>
  );
};

type Props = {
  children: JSX.Element;
};
const Auth = ({ children }: Props): JSX.Element => {
  const isLoading = useAuth();

  return isLoading ? <p>Loading...</p> : children;
};
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <RecoilRoot>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <Auth>
            <>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <Notify />
              <Component {...pageProps} />
            </>
          </Auth>
        </ThemeProvider>
      </CacheProvider>
    </RecoilRoot>
  );
}
