import React, { useState } from "react";
import TitleTag from "./TitleTag/TitleTag";

const TitledButton = (props) => {
  const [showTitleTag, setShowTitleTag] = useState(false);
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
      }}
      onMouseEnter={() => setShowTitleTag(true)}
      onMouseLeave={() => setShowTitleTag(false)}
    >
      {props.children}
      <TitleTag text={props.text} show={showTitleTag} />
    </div>
  );
};

export default TitledButton;
