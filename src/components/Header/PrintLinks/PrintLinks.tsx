import React from "react";
import { container } from "./PrintLinks.module.css";
import { ComponentProps } from "@Typings/component";

interface PrintLinkProps extends ComponentProps {}

export const PrintLinks: React.FC<PrintLinkProps> = () => {
  return (
    <ul className={container}>
      <li>
        <a href="mailto:hi@riccardocoppola.me">hi@riccardocoppola.me</a>
      </li>
      <li>
        <a href="https://riccardocoppola.me">riccardocoppola.me</a>
      </li>
    </ul>
  );
};

export default PrintLinks;
