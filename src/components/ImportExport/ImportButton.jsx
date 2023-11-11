import { faFileImport } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "./ImportExport.module.scss";

const ImportButton = ({ handleChange, importFileRef }) => {

  return (
    <div
      className={styles.importExportContainer}
    >
      <label htmlFor="file-input">
        <FontAwesomeIcon icon={faFileImport} />
      </label>
      <input
        ref={importFileRef}
        id="file-input"
        type="file"
        accept=".txt"
        onChange={handleChange}
      />
    </div>
  );
};

export default ImportButton;
