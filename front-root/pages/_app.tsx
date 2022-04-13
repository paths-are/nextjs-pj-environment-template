import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "@/src/libs/mui/theme";
import createEmotionCache from "@/src/libs/mui/createEmotionCache";
import { RecoilRoot } from "recoil";
import { getAnalytics } from "firebase/analytics";
import { app } from "@/src/libs/initFirebase";
import { useAuth } from "@/src/hooks/auth";

if (typeof window !== "undefined") {
  getAnalytics(app);
}

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
              <Component {...pageProps} />
            </>
          </Auth>
        </ThemeProvider>
      </CacheProvider>
    </RecoilRoot>
  );
}
