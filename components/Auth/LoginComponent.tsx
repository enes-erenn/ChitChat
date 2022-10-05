import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import styles from "./style.module.scss";

const LoginComponent = () => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Getting the variables
    const { email, password } = user;

    // Validating the form
    if (!email) {
      return alert("Please enter your email");
    }
    if (!password) {
      return alert("Please enter a password");
    }

    // Registering the user
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles["brand-name"]}>ChitChat</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h3 className={styles.header}>Login</h3>
          <p className={styles["have-account"]}>
            Don&apos;t Have an account? <Link href="/register">Sign up</Link>
          </p>

          <input
            type="email"
            placeholder="Email"
            value={user.email}
            name="email"
            onChange={handleChange}
          ></input>
          <input
            type="password"
            placeholder="Password"
            value={user.password}
            name="password"
            onChange={handleChange}
          ></input>
          <button>Login</button>
        </form>
        {error && <p>Something went wrong!</p>}
      </div>
    </div>
  );
};

export default LoginComponent;
