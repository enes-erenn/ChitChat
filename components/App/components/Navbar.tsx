import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import styles from "../style.module.scss";
import { auth } from "../../../firebase";
import { AuthContext } from "../../../context/Auth";
import Image from "next/image";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className={styles.navbar}>
      <span className={styles.logo}>ChitChat</span>
      <div className={styles.user}>
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          <Image
            src={currentUser.photoURL || ""}
            alt="User"
            objectFit="contain"
            width="50px"
            height="50px"
          />
        </div>
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
