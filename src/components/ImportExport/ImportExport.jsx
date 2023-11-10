import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TitleTag from "../TitleTag/TitleTag";
import { faFileExport, faFileImport } from "@fortawesome/free-solid-svg-icons";
import styles from "./ImportExport.module.scss";

const ImportExport = ({ type, handleChange, handleClick, importFileRef }) => {
  const [showTitleTag, setShowTitleTag] = useState(false);
  return (
    <div
      className={styles.importExportContainer}
      onMouseEnter={() => setShowTitleTag(true)}
      onMouseLeave={() => setShowTitleTag(false)}
    >
      {type === "Import" ? (
        <>
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
        </>
      ) : (
        <button onClick={handleClick}>
          <FontAwesomeIcon icon={faFileExport} />
        </button>
      )}
      <TitleTag text={type} show={showTitleTag} />
    </div>
  );
};

export default ImportExport;
