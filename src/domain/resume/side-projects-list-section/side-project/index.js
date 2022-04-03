import React from "react";
import { description } from "./side-project.module.css";

const SideProject = ({ title, link, children }) => {
  return (
    <li>
      <em>
        {link ? (
          <a alt={title} href={link}>
            {title}
          </a>
        ) : (
          { title }
        )}
      </em>
      <div
        className={description}
        dangerouslySetInnerHTML={{ __html: children }}
      />
    </li>
  );
};

export default SideProject;
