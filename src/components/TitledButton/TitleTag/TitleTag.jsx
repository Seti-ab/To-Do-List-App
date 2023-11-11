import React from "react";
import styles from "./TitleTag.module.scss";

const TitleTag = ({ text, show }) => {
  return (
    <div
      className={
        styles.TitleTagContainer +
        " " +
        (show ? styles.showTitleTag : styles.hideTitleTag)
      }
    >
      <span>{text}</span>
    </div>
  );
};

export default TitleTag;
