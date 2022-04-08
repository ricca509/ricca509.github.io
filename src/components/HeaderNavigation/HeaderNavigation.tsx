import React from "react";
import { SocialIcon } from "react-social-icons";
import { container, navElement, list } from "./HeaderNavigation.module.css";

const links = [
  ["github", "https://github.com/ricca509"],
  ["linkedin", "https://www.linkedin.com/in/riccardocoppola/"],
  ["fivehundredpix", "https://500px.com/ricca509"],
  ["mailto", "mailto:riccardo@onefiniteloop.io"],
];

export const HeaderNavigation = () => {
  return (
    <div className={container}>
      <ul className={list}>
        <li className={navElement}>
          <a href="/blog">Blog</a>
        </li>
        <li className={navElement}>
          <a href="/">Profile</a>
        </li>
      </ul>
      <ul className={list}>
        {links.map(([network, link]) => (
          <li className={navElement} key={link}>
            <SocialIcon
              network={network}
              url={link}
              bgColor="#fff"
              fgColor="#6c7888"
              style={{ height: 30, width: 30 }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HeaderNavigation;
