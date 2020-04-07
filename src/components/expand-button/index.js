import React from "react";
import style from "./expand-button.module.css";

const ExpandButton = ({ onClick, isInCollapsedState }) => {
  return (
    <button className={style.button} onClick={onClick}>
      {isInCollapsedState ? (
        <div
          className={[style.arrow, style.arrowDown].join(" ")}
          role="arrow down"
        ></div>
      ) : (
        <div
          className={[style.arrow, style.arrowUp].join(" ")}
          role="arrow up"
        ></div>
      )}
    </button>
  );
};

export default ExpandButton;
