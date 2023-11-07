import React from "react";
import styles from "./ImportButton.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImport } from "@fortawesome/free-solid-svg-icons";

const ImportButton = ({ handleChange }) => {
  return (
    <div className={styles.importButton}>
      <label for="file-input">
        <FontAwesomeIcon icon={faFileImport}/>
      </label>
      <input id="file-input" type="file" accept=".txt" onChange={handleChange} />
    </div>
  );
};

export default ImportButton;
