import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import styles from "../style.module.scss";
import Chats from "./Chats";

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
