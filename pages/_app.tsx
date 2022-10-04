import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthContextProvider } from "../context/AuthContext.js";
import { ChatContextProvider } from "../context/ChatContext.js";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <ChatContextProvider>
        <Component {...pageProps} />
      </ChatContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
