import React from "react";
import styles from "./ExportButton.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";

const ExportButton = ({handleClick}) => {
  return (
    <div className={styles.exportButton}>
      <button onClick={handleClick}>
        <FontAwesomeIcon icon={faFileExport} />
      </button>
    </div>
  );
};

export default ExportButton;
