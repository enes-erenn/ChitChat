import React from "react";
import Chat from "./components/Chat";
import Chats from "./components/Chats";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import styles from "./style.module.scss";

const App = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default App;
