import React from "react";
import { SocialIcon } from "react-social-icons";
import styles from "./social-navigation.module.css";

const renderNavigationElements = () => {
  const links = [
    "https://github.com/ricca509",
    "https://www.linkedin.com/in/riccardocoppola/",
    "https://twitter.com/onefiniteloop",
    "https://www.instagram.com/ricca509/",
    "https://onefiniteloop.io",
    "mailto:riccardo@onefiniteloop.io",
  ];

  return links.map(link => {
    return (
      <li className={styles.navElement} key={link}>
        <SocialIcon
          url={link}
          bgColor="#fff"
          fgColor="#6c7888"
          style={{ height: 35, width: 35 }}
        />
      </li>
    );
  });
};

const HeaderNavigation = () => {
  return <ul className={styles.container}>{renderNavigationElements()}</ul>;
};

export default HeaderNavigation;
