import React from "react";
import SideProject from "../side-project/side-project";

const SideProjectsListSection = ({ sideProjectsList }) => {
  return (
    <>
      <h2>Side projects</h2>
      {sideProjectsList.map(({ node }) => {
        return (
          <SideProject
            key={node.id}
            title={node.frontmatter.title}
            link={node.frontmatter.link}
          >
            {node.html}
          </SideProject>
        );
      })}
    </>
  );
};

export default SideProjectsListSection;
