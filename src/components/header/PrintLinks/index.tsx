import React from "react";
import { container } from "./print-links.module.css";
import { ComponentProps } from "@Typings/component";

interface PrintLinkProps extends ComponentProps {}

export const PrintLinks: React.FC<PrintLinkProps> = () => {
  return (
    <ul className={container}>
      <li>
        <a href="mailto:riccardo@onefiniteloop.io">riccardo@onefiniteloop.io</a>
      </li>
      <li>
        <a href="https://riccardocoppola.me">riccardocoppola.me</a>
      </li>
    </ul>
  );
};

export default PrintLinks;
