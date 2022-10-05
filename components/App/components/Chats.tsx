import { doc, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { ChatContext } from "../../../context/ChatContext";
import { db } from "../../../firebase";
import styles from "../style.module.scss";

interface Chat {
  id: "";
  userInfo: {
    photoURL: String;
    displayName: String;
    lastMessage: {
      text: String;
    };
  };
}

const Chats = () => {
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const [chats, setChats] = useState<Chat>({
    id: "",
    userInfo: {
      photoURL: "",
      displayName: "",
      lastMessage: {
        text: "",
      },
    },
  });

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(
        doc(db, "userChats", currentUser.uid),
        (doc: any) => {
          setChats(doc.data());
        }
      );
      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);
  console.log(chats);
  const handleSelect = (user: Object) => {
    dispatch({ type: "CHANGE_USER", payload: user });
  };

  return (
    <div className={styles.chats}>
      {chats &&
        Object.entries(chats)
          ?.sort((a: any, b: any) => a[1].date - b[1].date)
          .map((chat: any) => (
            <div
              className={styles.userChat}
              key={chat[0]}
              onClick={() => handleSelect(chat[1].userInfo)}
            >
              <Image
                src={chat[1]?.userInfo?.photoURL}
                alt="User"
                width="60"
                height="60"
                objectFit="contain"
              />
              <div className={styles.userChatInfo}>
                <h4>{chat[1]?.userInfo?.displayName}</h4>
                <span>{chat[1]?.lastMessage?.text}</span>
              </div>
            </div>
          ))}
    </div>
  );
};

export default Chats;
