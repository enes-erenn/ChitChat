import type { AppProps } from "next/app";
import { AuthContextProvider } from "../context/AuthContext.js";
import { ChatContextProvider } from "../context/ChatContext.js";
import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>ChitChat - Realtime Chatting App</title>
      </Head>
      <AuthContextProvider>
        <ChatContextProvider>
          <Component {...pageProps} />
        </ChatContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default MyApp;
