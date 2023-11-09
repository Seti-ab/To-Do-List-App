import React from "react";
import styles from "./ImportButton.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImport } from "@fortawesome/free-solid-svg-icons";
import TitleTag from "../TitleTag/TitleTag";
import { useState } from "react";

const ImportButton = ({ handleChange, importFileRef }) => {
  const [showTitleTag, setShowTitleTag] = useState(false);
  return (
    <>
      <div className={styles.importButton} onMouseEnter={()=>setShowTitleTag(true)} onMouseLeave={()=>setShowTitleTag(false)}>
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
      <TitleTag text="Import tasks from a file" show={showTitleTag} direction="left"/>
    </>
  );
};

export default ImportButton;
