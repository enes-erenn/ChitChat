import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";
import styles from "../style.module.scss";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Navbar />
      <Search />
      <Chats />
    </div>
  );
};

export default Sidebar;
