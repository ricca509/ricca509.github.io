import React from "react";
import { SocialIcon } from "react-social-icons";
import styles from "./social-navigation.module.css";

const renderNavigationElements = () => {
  const links = [
    ["github", "https://github.com/ricca509"],
    ["linkedin", "https://www.linkedin.com/in/riccardocoppola/"],
    ["twitter", "https://twitter.com/onefiniteloop"],
    ["instagram", "https://www.instagram.com/ricca509/"],
    ["fivehundredpix", "https://500px.com/ricca509"],
    ["rss", "https://onefiniteloop.io"],
    ["mailto", "mailto:riccardo@onefiniteloop.io"],
  ];

  return links.map(([network, link]) => {
    return (
      <li className={styles.navElement} key={link}>
        <SocialIcon
          network={network}
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
