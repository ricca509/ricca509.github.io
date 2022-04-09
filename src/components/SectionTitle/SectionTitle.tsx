import React from "react";
import { title } from "./SectionTitle.module.css";
import { ComponentProps } from "@Typings/component";

interface SectionTitleProps extends ComponentProps {}

export const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => {
  return <h2 className={title}>{children}</h2>;
};

export default SectionTitle;
