import React from "react";
import { button, arrow, arrowDown, arrowUp } from "./ExpandButton.module.css";
import { ComponentProps } from "../../typings/component";

interface ExpandButtonProps extends ComponentProps {
  // TODO: figure out how to type this
  onClick: (e: any) => void;
  isInCollapsedState: boolean;
}

export const ExpandButton: React.FC<ExpandButtonProps> = ({
  onClick,
  isInCollapsedState,
}) => {
  return (
    <button className={button} onClick={onClick}>
      {isInCollapsedState ? (
        <div className={[arrow, arrowDown].join(" ")} role="img"></div>
      ) : (
        <div className={[arrow, arrowUp].join(" ")} role="img"></div>
      )}
    </button>
  );
};

export default ExpandButton;
