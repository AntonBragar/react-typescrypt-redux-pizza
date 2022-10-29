import React from "react";
import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <span>😒</span>
      <br />
      <h1>Nothing Found</h1>
    </div>
  );
};

export default NotFoundBlock;
