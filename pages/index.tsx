import type { NextPage } from "next";
import Head from "next/head";
import App from "../components/App/App";
import Register from "./register";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p> Welcome :)</p>
      <App />
    </div>
  );
};

export default Home;
