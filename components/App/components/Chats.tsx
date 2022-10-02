import React from "react";
import styles from "../style.module.scss";

const Chats = () => {
  return (
    <div className={styles.chats}>
      <div className={styles.userChat}>
        <img src="" alt="" />
        <div className={styles.userChatInfo}>
          <span>John</span>
        </div>
      </div>
      <div className={styles.userChat}>
        <img src="" alt="" />
        <div className={styles.userChatInfo}>
          <span>John</span>
        </div>
      </div>
      <div className={styles.userChat}>
        <img src="" alt="" />
        <div className={styles.userChatInfo}>
          <span>John</span>
        </div>
      </div>
      <div className={styles.userChat}>
        <img src="" alt="" />
        <div className={styles.userChatInfo}>
          <span>John</span>
        </div>
      </div>
    </div>
  );
};

export default Chats;
