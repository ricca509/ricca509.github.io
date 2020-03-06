import React from "react";
import style from "./expand-button.module.css";

const ExpandButton = ({ onClick, isInCollapsedState }) => {
  return (
    <button className={style.button} onClick={onClick}>
      {isInCollapsedState ? <span>More</span> : <span>Less</span>}
    </button>
  );
};

export default ExpandButton;
