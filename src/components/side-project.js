import React from "react";
import Markdown from "markdown-to-jsx";

const SideProject = ({ title, description }) => {
  return (
    <li>
      <em>
        <Markdown>{title}</Markdown>
      </em>
      <p>
        <Markdown>{description}</Markdown>
      </p>
    </li>
  );
};

export default SideProject;
