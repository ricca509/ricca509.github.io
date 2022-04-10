import React from "react";
import { button } from "./Cta.module.css";
import { ComponentProps } from "@Typings/component";

interface CtaProps extends ComponentProps {
  type: "a" | "button";
}

export const Cta: React.FC<CtaProps> = ({ type = "a", children, ...props }) => {
  const Element = type;

  return (
    <Element {...props} className={button}>
      {children}
    </Element>
  );
};

export default Cta;
