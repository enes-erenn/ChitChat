import React from "react";
import styles from "../style.module.scss";

const Input = () => {
  return (
    <div className={styles.input}>
      <input type="text" placeholder="Type"></input>
      <div className={styles.send}>
        <img src="" alt="" />
        <input type="file" style={{ display: "none" }} id="file"></input>
        <label htmlFor="file">
          <img src="" alt="" />
        </label>
        <button>Send</button>
      </div>
    </div>
  );
};

export default Input;
