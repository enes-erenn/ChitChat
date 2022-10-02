import Link from "next/link";
import React from "react";
import styles from "./style.module.scss";

const LoginComponent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles["brand-name"]}>ChitChat</h2>
        <form className={styles.form}>
          <img src="" alt="" className={styles["brand-logo"]} />
          <h3 className={styles.header}>Login</h3>
          <p className={styles["have-account"]}>
            Don&apos;t Have an account? <Link href="/register">Sign up</Link>
          </p>
          <input type="text" placeholder="Full Name"></input>
          <input type="email" placeholder="Email"></input>
          <input type="password" placeholder="Password"></input>
          <button>Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
