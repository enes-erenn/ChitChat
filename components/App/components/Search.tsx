import React from "react";
import styles from "../style.module.scss";

const Search = () => {
  return (
    <div className={styles.search}>
      <div className={styles.searchForm}>
        <input type="text" placeholder="Search for a user" />
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

export default Search;
