import React, { useContext } from "react";
import Image from "next/image";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import { AuthContext } from "../../../context/AuthContext";
import Logout from "../../../assets/icons/logout.png";
import styles from "../style.module.scss";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className={styles.navbar}>
      <span className={styles.logo}>ChitChat</span>
      <div className={styles.user}>
        <div className={styles.imageLayout}>
          <Image
            src={currentUser.photoURL || ""}
            alt="User"
            objectFit="contain"
            width="32px"
            height="32px"
          />
        </div>
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}>
          <Image
            src={Logout}
            width="20px"
            height="20px"
            alt="Logout"
            className={styles.asd}
          />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
