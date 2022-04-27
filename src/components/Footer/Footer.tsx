import React from "react";
import { ComponentProps } from "@Typings/component";

interface FooterProps extends ComponentProps {}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="flex flex-col text-sm mx-0 my-10 pt-5 text-center text-zinc-400 print:hidden">
      <p>© {new Date().getFullYear()} Riccardo Coppola</p>
      <p>
        This application is built with{" "}
        <a href="https://www.gatsbyjs.org/" alt="Gatsby link">
          Gatsby
        </a>{" "}
        and hosted on GitHub pages, take a look at the{" "}
        <a
          href="https://github.com/ricca509/ricca509.github.io"
          alt="GitHub repository"
          target="blank"
        >
          source code on GitHub
        </a>
        .
      </p>
    </footer>
  );
};

export default Footer;
