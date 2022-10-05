import React, { useContext, useState } from "react";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../../firebase";
import { v4 as uuid } from "uuid";
import { AuthContext } from "../../../context/AuthContext";
import { ChatContext } from "../../../context/ChatContext";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import styles from "../style.module.scss";
import Attach from "../../../assets/icons/Attach.png";
import AddImage from "../../../assets/icons/AddImage.png";
import Image from "next/image";

const Input = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>();
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (image) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on("state_changed", () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: currentUser.uid,
              date: Timestamp.now(),
              img: downloadURL,
            }),
          });
        });
      });
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImage(null);
  };

  return (
    <div className={styles.input}>
      <input
        type="text"
        placeholder="Type something.."
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setText(e.target.value)
        }
        value={text}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.code === "Enter") {
            return handleSend();
          }
        }}
      />
      <div className={styles.send}>
        <Image
          src={Attach}
          alt="Attach"
          width="24px"
          height="24px"
          objectFit="contain"
        />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setImage(((e.target as HTMLInputElement).files as FileList)[0]);
          }}
        />
        <label htmlFor="file">
          <Image
            src={AddImage}
            alt="AddImage"
            width="24px"
            height="24px"
            objectFit="contain"
          />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;
