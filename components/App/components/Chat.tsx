import React from "react";
import Input from "./Input";
import Messages from "./Messages";
import styles from "../style.module.scss";

const Chat = () => {
  return (
    <div className={styles.chat}>
      <div className={styles.chatInfo}>
        <span>Jane</span>
        <div className={styles.chatIcons}>
          <img src="" alt="Camera" />
          <img src="" alt="Add" />
          <img src="" alt="More" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
