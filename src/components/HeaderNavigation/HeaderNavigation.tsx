import React from "react";
import { SocialIcon } from "react-social-icons";
import {
  container,
  navElement,
  list,
  textLinks,
  iconLinks,
} from "./HeaderNavigation.module.css";
import { Link } from "gatsby";

const links = [
  ["github", "https://github.com/ricca509"],
  ["linkedin", "https://www.linkedin.com/in/riccardocoppola/"],
  ["mailto", "mailto:riccardo@onefiniteloop.io"],
  ["rss", "/rss.xml"],
];

export const HeaderNavigation = () => {
  return (
    <div className={container}>
      <ul className={[list, textLinks].join(" ")}>
        <li className={navElement}>
          <Link to="/blog">Blog</Link>
        </li>
        <li className={navElement}>
          <Link to="/photography">Photography</Link>
        </li>
        <li className={navElement}>
          <Link to="/about">About</Link>
        </li>        
      </ul>
      <ul className={[list, iconLinks].join(" ")}>
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
