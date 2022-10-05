import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import styles from "./style.module.scss";
import Avatar from "../../assets/icons/Avatar.png";

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
          <div className={styles.headerWrapper}>
            <h3 className={styles.header}>Register</h3>
            <p className={styles["have-account"]}>
              Have an account?{" "}
              <Link href="/login" className={styles.link}>
                Login
              </Link>
            </p>
          </div>
          <div>
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
          </div>
          <input
            type="email"
            placeholder="Email"
            value={user.email}
            name="email"
            onChange={handleChange}
          ></input>
          <div>
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
          </div>
          <input
            type="file"
            id="file"
            className={styles.file}
            name="file"
            onChange={handleChange}
          />
          <div className={styles.addFile}>
            <div style={{ position: "relative" }}>
              <Image
                src={Avatar}
                width="36px"
                height="36px"
                alt="Add Image"
                objectFit="contain"
              />
            </div>
            <label htmlFor="file">Add an Avatar</label>
          </div>
          <button>Sign up</button>
        </form>
        {error && <p>Something went wrong!</p>}
      </div>
    </div>
  );
};

export default RegisterComponent;
