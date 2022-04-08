import React from "react";
import { graphql, PageProps } from "gatsby";
import { Layout } from "../components/Layout/Layout";
import { Seo } from "../components/Seo/Seo";
import { AboutMe } from "../domain/resume/AboutMe/AboutMe";
import SideProjectsListSection from "../domain/resume/side-projects-list-section";
import WorkExperienceListSection from "../domain/resume/WorkExperienceListSection/WorkExperienceListSection";
import OtherSectionsList from "../domain/resume/other-sections-list";
import { ProfileQuery } from "../../graphql-types";

const IndexPage: React.FC<PageProps<ProfileQuery>> = ({ data }) => {
  return (
    <Layout>
      <Seo title="Profile" />
      <AboutMe image={data?.file?.childImageSharp?.gatsbyImageData}>
        {data?.about?.html}
      </AboutMe>
      <WorkExperienceListSection experienceList={data.experience.edges} />
      <SideProjectsListSection sideProjectsList={data.sideProjects.edges} />
      <OtherSectionsList sectionList={data.otherSections.edges} />
    </Layout>
  );
};

export const query = graphql`
  query Profile {
    file(relativePath: { eq: "me.jpeg" }) {
      childImageSharp {
        gatsbyImageData(layout: FIXED, width: 100, height: 100)
      }
    }
    experience: allMarkdownRemark(
      sort: { order: DESC, fields: frontmatter___to_date }
      filter: { fileAbsolutePath: { glob: "**/content/resume/experience/*" } }
    ) {
      edges {
        node {
          id
          frontmatter {
            company
            location
            role
            from_date(formatString: "MMM YYYY")
            to_date(formatString: "MMM YYYY")
            technologies
          }
          html
        }
      }
    }
    sideProjects: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { glob: "**/content/resume/side-projects/*" }
      }
      sort: { fields: frontmatter___order, order: ASC }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            link
          }
          html
        }
      }
    }
    otherSections: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { glob: "**/content/resume/other-sections/*" }
      }
      sort: { fields: frontmatter___order, order: ASC }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
          }
          html
        }
      }
    }
    about: markdownRemark(
      fileAbsolutePath: { glob: "**/content/resume/about-me.md" }
    ) {
      html
    }
  }
`;

export default IndexPage;
