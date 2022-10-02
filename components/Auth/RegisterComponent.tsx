import Link from "next/link";
import React from "react";
import styles from "./style.module.scss";

const RegisterComponent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles["brand-name"]}>ChitChat</h2>
        <form className={styles.form}>
          <img src="" alt="" className={styles["brand-logo"]} />
          <h3 className={styles.header}>Register</h3>
          <p className={styles["have-account"]}>
            Have an account? <Link href="/login">Login</Link>
          </p>
          <input type="text" placeholder="Full Name"></input>
          <input type="email" placeholder="Email"></input>
          <input type="password" placeholder="Password"></input>
          <input type="password" placeholder="Password Confirm"></input>
          <input type="file" id="file" className={styles.file} />
          <label htmlFor="file">Add an Avatar</label>
          <button>Sign up</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterComponent;
