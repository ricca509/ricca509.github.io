import React from "react";
import style from "./expand-button.module.css";

const ExpandButton = ({ onClick, isInCollapsedState }) => {
  return (
    <button className={style.button} onClick={onClick}>
      {isInCollapsedState ? (
        <div
          className={[style.arrow, style.arrowDown].join(" ")}
          aria-role="arrow down"
        ></div>
      ) : (
        <div
          className={[style.arrow, style.arrowUp].join(" ")}
          aria-role="arrow down"
        ></div>
      )}
    </button>
  );
};

export default ExpandButton;
