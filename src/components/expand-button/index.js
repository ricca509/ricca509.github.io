import React from "react";
import style from "./expand-button.module.css";

const ExpandButton = ({ onClick, isInCollapsedState }) => {
  return (
    <button className={style.button} onClick={onClick}>
      {isInCollapsedState ? <span>&#8964;</span> : <span>&#8963;</span>}
    </button>
  );
};

export default ExpandButton;
