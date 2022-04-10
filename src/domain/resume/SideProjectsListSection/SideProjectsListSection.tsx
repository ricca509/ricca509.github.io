import React from "react";
import { SideProject } from "./SideProject/SideProject";
import { SectionTitle } from "@Components/SectionTitle/SectionTitle";
import { list } from "./SideProjectsListSection.module.css";
import { ComponentProps } from "@Typings/component";
import { ProfileQuery } from "../../../../graphql-types";

interface SideProjectsListSectionProps extends ComponentProps {
  sideProjectsList: ProfileQuery["sideProjects"]["edges"];
}

export const SideProjectsListSection: React.FC<
  SideProjectsListSectionProps
> = ({ sideProjectsList }) => {
  return (
    <>
      <SectionTitle>Side projects</SectionTitle>
      <ul className={list}>
        {sideProjectsList.map(({ node }) => {
          return (
            <SideProject
              key={node.id}
              title={node?.frontmatter?.title || ""}
              link={node?.frontmatter?.link || "#"}
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
