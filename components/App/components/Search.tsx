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
import styles from "../style.module.scss";
import { AuthContext } from "../../../context/Auth";

const Search = () => {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(
    {} || { uid: "", displayName: "", photoURL: "" }
  );
  const { currentUser } = useContext(AuthContext);

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
    let id: String = "";
    let photoURL: String = "";
    let displayName: String = "";
    if (user.uid && user.displayName && user.photoURL) {
      id = user.uid;
      photoURL = user.photoURL;
      displayName = user.displayName;
    }
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > id ? currentUser.uid + id : id + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
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
        />
      </div>
      {user && (
        <div className={styles.userChat} onClick={handleSelect}>
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <Image
              src={""}
              alt="User"
              objectFit="contain"
              width="30px"
              height="30px"
            />
          </div>
          <div className={styles.userChatInfo}>
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
