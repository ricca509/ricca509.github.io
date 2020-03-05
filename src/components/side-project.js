import React from "react";
import style from "./side-project.module.css";

const SideProject = ({ title, link, description }) => {
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
      <p
        className={style.description}
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </li>
  );
};

export default SideProject;
