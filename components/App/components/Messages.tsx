import { doc, onSnapshot } from "firebase/firestore";
import mitt from "next/dist/shared/lib/mitt";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../../context/ChatContext";
import { db } from "../../../firebase";
import styles from "../style.module.scss";
import Message from "./Message";

const Messages = () => {
  const { data } = useContext(ChatContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc: any) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data]);

  return (
    <div className={styles.messages}>
      {messages.map((m: any) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
