import Image from "next/image";
import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { AuthContext } from "../../../context/AuthContext";
import styles from "../style.module.scss";

const Search = () => {
  const { currentUser } = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(
    {} || { uid: "", displayName: "", photoURL: "" }
  );

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if (doc) {
          setUser(doc.data());
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelect = async () => {
    let uid: string = "";
    let photoURL: string = "";
    let displayName: string = "";
    if (user.uid && user.displayName && user.photoURL) {
      uid = user.uid;
      photoURL = user.photoURL;
      displayName = user.displayName;
    }
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > uid ? currentUser.uid + uid : uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid,
            displayName,
            photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        setUser({ displayName: "", uid: "", photoURL: "" });
        setUserName("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    e.code === "Enter" && handleSearch();
  };

  return (
    <div className={styles.search}>
      <div className={styles.searchForm}>
        <input
          type="text"
          placeholder="Search for a user"
          onKeyDown={handleKey}
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
        />
      </div>
      {Object.entries(user).length > 0 && (
        <div className={styles.userChat} onClick={handleSelect}>
          <Image
            src={user.photoURL || ""}
            alt="User"
            objectFit="contain"
            width="48px"
            height="48px"
          />
          <div className={styles.userChatInfo}>
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
