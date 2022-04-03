import React from "react";
import { button } from "./cta.module.css";

const types = Object.freeze({
  link: "a",
  button: "button",
});

const Cta = ({ type = types.link, children, ...props }) => {
  const Element = types[type] || types.link;

  return (
    <Element {...props} className={button}>
      {children}
    </Element>
  );
};

Cta.types = types;

export default Cta;
