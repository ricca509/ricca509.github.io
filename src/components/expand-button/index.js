import React from "react";
import { button, arrow, arrowDown, arrowUp } from "./expand-button.module.css";

const ExpandButton = ({ onClick, isInCollapsedState }) => {
  return (
    <button className={button} onClick={onClick}>
      {isInCollapsedState ? (
        <div
          className={[arrow, arrowDown].join(" ")}
          role="img"
        ></div>
      ) : (
        <div
          className={[arrow, arrowUp].join(" ")}
          role="img"
        ></div>
      )}
    </button>
  );
};

export default ExpandButton;
