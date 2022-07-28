import React from "react";
import { HeaderNavigation } from "../HeaderNavigation/HeaderNavigation";
import { PrintLinks } from "./PrintLinks/PrintLinks";
import useIsPrinting from "../../hooks/useIsPrinting";
import { container, author } from "./Header.module.css";
import { ComponentProps } from "@Typings/component";

interface HeaderProps extends ComponentProps {
  showName?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ showName = false }) => {
  const isPrinting = useIsPrinting();

  return (
    <header className={container}>
      {showName && (
        <h2 className={author}>
          <a href="/blog">Riccardo Coppola</a>
        </h2>
      )}
      <nav>
        {isPrinting && <PrintLinks />}
        {!isPrinting && <HeaderNavigation />}
      </nav>
    </header>
  );
};

export default Header;
