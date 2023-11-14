import React from "react";
import styles from "./Tooltip.module.scss";

const Tooltip = ({ text, direction }) => {
  const locale = localStorage.getItem("locale");
  return (
    <div
      className={
        styles.tooltipContainer
        
      }
    >
      <div className={styles.tooltip + " " +
        (direction === "left" ? (locale==="fa" ? styles.left : styles.right) : styles.default)}>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Tooltip;
