import React from "react";
import { description } from "./SideProject.module.css";
import { ComponentProps } from "@Typings/component";

interface SideProjectProps extends ComponentProps {
  title: string;
  link: string;
}

export const SideProject: React.FC<SideProjectProps> = ({ title, link, children }) => {
  return (
    <li>
      <em>
        {link ? (
          <a aria-label={title} href={link}>
            {title}
          </a>
        ) : (
          { title }
        )}
      </em>
      <div
        className={description}
        dangerouslySetInnerHTML={{ __html: children as string }}
      />
    </li>
  );
};

export default SideProject;
