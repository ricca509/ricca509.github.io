import React from "react";
import SideProject from "../side-project";
import SectionTitle from "../section-title";
import style from "./side-projects-list-section.module.css";

const SideProjectsListSection = ({ sideProjectsList }) => {
  return (
    <>
      <SectionTitle>Side projects</SectionTitle>
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
