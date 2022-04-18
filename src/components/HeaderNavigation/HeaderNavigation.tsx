import React from "react";
import { SocialIcon } from "react-social-icons";

const links = [
  ["github", "https://github.com/ricca509"],
  ["linkedin", "https://www.linkedin.com/in/riccardocoppola/"],
  ["fivehundredpix", "https://500px.com/ricca509"],
  ["mailto", "mailto:riccardo@onefiniteloop.io"],
];

export const HeaderNavigation = () => {
  return (
    <div className="flex items-center flex-row justify-between">
      <ul className="text-lg list-none text-center">
        <li className="list-none inline pr-5">
          <a href="/blog">Blog</a>
        </li>
        <li className="list-none inline pr-5">
          <a href="/">Profile</a>
        </li>
      </ul>
      <ul className="list-none inline pr-5">
        {links.map(([network, link]) => (
          <li className="list-none inline pr-5" key={link}>
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
