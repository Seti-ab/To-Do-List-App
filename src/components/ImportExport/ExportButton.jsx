import { faFileExport } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "./ImportExport.module.scss";

const ExportButton = ({ handleClick }) => {
  return (
    <div
      className={styles.importExportContainer}>
      <button onClick={handleClick}>
        <FontAwesomeIcon icon={faFileExport} />
      </button>
    </div>
  );
};

export default ExportButton;
