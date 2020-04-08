import React from "react";
import SocialNavigation from "../social-navigation";
import PrintLinks from "./print-links";
import useIsPrinting from "../../hooks/useIsPrinting";
import styles from "./header.module.css";

const Header = () => {
  const isPrinting = useIsPrinting();

  return (
    <header className={styles.container}>
      <nav>
        {isPrinting && <PrintLinks />}
        {!isPrinting && <SocialNavigation />}
      </nav>
    </header>
  );
};

export default Header;
