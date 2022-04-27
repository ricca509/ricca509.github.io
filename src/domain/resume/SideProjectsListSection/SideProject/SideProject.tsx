import React from "react";
import { ComponentProps } from "@Typings/component";

interface SideProjectProps extends ComponentProps {
  title: string;
  link: string;
}

export const SideProject: React.FC<SideProjectProps> = ({
  title,
  link,
  children,
}) => {
  return (
    <li>
      <em>
        {link ? (
          <a aria-label={title} href={link}>
            {title}
          </a>
        ) : (
          {title}
        )}
      </em>
      <div
        className="ml-5"
        dangerouslySetInnerHTML={{ __html: children as string }}
      />
    </li>
  );
};

export default SideProject;
