import React from "react";
import { SocialIcon } from "react-social-icons";
import styles from "./header-navigation.module.css";

const renderNavigationElements = links =>
  links.map(link => {
    return (
      <li className={styles.navElement} key={link}>
        <SocialIcon
          url={link}
          bgColor="#aaa"
          style={{ height: 35, width: 35 }}
        />
      </li>
    );
  });

const HeaderNavigation = ({ links }) => {
  return <ul>{renderNavigationElements(links)}</ul>;
};

export default HeaderNavigation;
