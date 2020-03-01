import PropTypes from "prop-types";
import React from "react";
import HeaderNavigation from "./header-navigation";
import styles from "./header.module.css";

const Header = ({ siteTitle }) => (
  <header className={styles.container}>
    <nav>
      <HeaderNavigation
        links={[
          "https://github.com/ricca509",
          "https://www.instagram.com/ricca509/",
          "https://twitter.com/onefiniteloop",
          "https://www.linkedin.com/in/riccardocoppola/",
          "https://onefiniteloop.io",
          "mailto:riccardo@onefiniteloop.io",
        ]}
      />
    </nav>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
