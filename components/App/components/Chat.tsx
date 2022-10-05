import React, { useContext } from "react";
import Input from "./Input";
import Messages from "./Messages";
import { ChatContext } from "../../../context/ChatContext";
import More from "../../../assets/icons/More.png";
import styles from "../style.module.scss";
import Image from "next/image";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className={styles.chat}>
      <div className={styles.chatInfo}>
        <span>{data.user?.displayName}</span>
        <div className={styles.chatIcons}>
          <Image
            src={More}
            width="24px"
            height="24px"
            alt="More"
            objectFit="contain"
          />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
