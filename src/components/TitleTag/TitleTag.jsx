import React from "react";
import styles from "./TitleTag.module.scss";

const TitleTag = ({ text, show, direction }) => {
  const selectStyles = () => {
    switch(show){
      case true:
        
    }
  };
  console.log("check",selectStyles())
  return (
    <div className={styles.TitleTagContainer + " " + styles[selectStyles()]}>
      <span>{text}</span>
    </div>
  );
};

export default TitleTag;
