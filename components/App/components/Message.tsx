import React from "react";
import styles from "../style.module.scss";

const Message = () => {
  return (
    <div className={`${styles.message} ${styles.owner}`}>
      <div className={styles.messageInfo}>
        <img src="" alt="" />
        <span>just now</span>
      </div>
      <div className={styles.messageContent}>
        <p>hello</p>
        <img src="" alt="" />
      </div>
    </div>
  );
};

export default Message;
