import React from "react";
import SocialNavigation from "../social-navigation";
import PrintLinks from "./print-links";
import useIsPrinting from "../../hooks/useIsPrinting";
import { container, author } from "./header.module.css";

const Header = ({ showName = false }) => {
  const isPrinting = useIsPrinting();

  return (
    <header className={container}>
      {showName && (
        <h1 className={author}>
          <a href="/blog">Riccardo Coppola</a>
        </h1>
      )}
      <nav>
        {isPrinting && <PrintLinks />}
        {!isPrinting && <SocialNavigation />}
      </nav>
    </header>
  );
};

export default Header;
