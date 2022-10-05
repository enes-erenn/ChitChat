import React, { useContext, useEffect, useRef } from "react";
import Image from "next/image";
import { AuthContext } from "../../../context/AuthContext";
import { ChatContext } from "../../../context/ChatContext";
import styles from "../style.module.scss";

type Props = {
  message: {
    senderId: String;
    text: String;
    img: HTMLImageElement;
  };
};

const Message: React.FC<Props> = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      className={`${styles.message}  ${
        message.senderId === currentUser.uid && styles.owner
      }`}
      ref={ref}
    >
      <div className={styles.messageInfo}>
        <Image
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt="User"
          width="64px"
          height="64px"
        />
      </div>
      <div className={styles.messageContent}>
        {message.text ? (
          <p>{message.text}</p>
        ) : (
          <Image
            src={message.img || ""}
            alt="Image"
            width="100px"
            height="100px"
          />
        )}
      </div>
    </div>
  );
};

export default Message;
