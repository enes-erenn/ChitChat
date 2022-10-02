import React from "react";
import styles from "../style.module.scss";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <span className={styles.logo}>ChitChat</span>
      <div className={styles.user}>
        <img src="" alt="" />
        <span>John</span>
        <button>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
