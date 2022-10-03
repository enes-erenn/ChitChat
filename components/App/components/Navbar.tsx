import React from "react";
import { signOut } from "firebase/auth";
import styles from "../style.module.scss";
import { auth } from "../../../firebase";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <span className={styles.logo}>ChitChat</span>
      <div className={styles.user}>
        <img src="" alt="" />
        <span>John</span>
        <button onClick={() => signOut(auth)}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
