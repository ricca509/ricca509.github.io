import React from "react";
import { title } from "./section-title.module.css";

const SectionTitle = ({ children }) => {
  return <h2 className={title}>{children}</h2>;
};

export default SectionTitle;
