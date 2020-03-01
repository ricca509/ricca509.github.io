import PropTypes from "prop-types";
import React from "react";
import SocialNavigation from "./social-navigation";
import styles from "./header.module.css";

const Header = ({ siteTitle }) => (
  <header className={styles.container}>
    <nav>
      <SocialNavigation />
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
