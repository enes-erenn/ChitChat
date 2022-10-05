import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import styles from "./style.module.scss";

const RegisterComponent = () => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    file: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "file") {
      setUser((prev) => ({
        ...prev,
        [e.target.name]: ((e.target as HTMLInputElement).files as FileList)[0],
      }));
    } else {
      setUser((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Getting the variables
    const { firstName, lastName, email, password, passwordConfirm, file } =
      user;

    // Validating the form
    if (!firstName) {
      return alert("Please enter your first name");
    }
    if (!lastName) {
      return alert("Please enter your last name");
    }
    if (!email) {
      return alert("Please enter your email");
    }
    if (!password) {
      return alert("Please enter a password");
    }
    if (password !== passwordConfirm) {
      return alert("Your passwords does not match!");
    }
    if (!file) {
      return alert("Please enter your photo");
    }

    // Registering the user
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, firstName + " " + lastName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on("state_changed", () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await updateProfile(res.user, {
            displayName: firstName + " " + lastName,
            photoURL: downloadURL,
          });
          await setDoc(doc(db, "users", res.user.uid), {
            displayName: res.user.displayName,
            email,
            photoURL: downloadURL,
            uid: res.user.uid,
          });

          await setDoc(doc(db, "userChats", res.user.uid), {});
          router.push("/");
        });
      });
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
         
          <h3 className={styles.header}>Register</h3>
          <p className={styles["have-account"]}>
            Have an account? <Link href="/login">Login</Link>
          </p>
          <input
            type="text"
            placeholder="First Name"
            value={user.firstName}
            name="firstName"
            onChange={handleChange}
          ></input>
          <input
            type="text"
            placeholder="Last Name"
            value={user.lastName}
            name="lastName"
            onChange={handleChange}
          ></input>
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
          <input
            type="password"
            placeholder="Password Confirm"
            value={user.passwordConfirm}
            name="passwordConfirm"
            onChange={handleChange}
          ></input>
          <input
            type="file"
            id="file"
            className={styles.file}
            name="file"
            onChange={handleChange}
          />
          <label htmlFor="file">Add an Avatar</label>
          <button>Sign up</button>
        </form>
        {error && <p>Something went wrong!</p>}
      </div>
    </div>
  );
};

export default RegisterComponent;
