import React from "react";
import SideProject from "../side-project";
import style from "./side-projects-list-section.module.css";

const SideProjectsListSection = ({ sideProjectsList }) => {
  return (
    <>
      <h2>Side projects</h2>
      <ul className={style.list}>
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
      </ul>
    </>
  );
};

export default SideProjectsListSection;
