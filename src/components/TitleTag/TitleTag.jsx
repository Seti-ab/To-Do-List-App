import React from "react";
import styles from "./TitleTag.module.scss";

const TitleTag = ({ text }) => {
  return (
    <div className={styles.TitleTagContainer}>
      <div>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default TitleTag;
