import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import AboutMe from "../domain/resume/about-me";
import SideProjectsListSection from "../domain/resume/side-projects-list-section";
import WorkExperienceListSection from "../domain/resume/work-experience-list-section";
import OtherSectionsList from "../domain/resume/other-sections-list";

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" />
      <AboutMe image={data.file.childImageSharp.fixed}>
        {data.about.html}
      </AboutMe>
      <WorkExperienceListSection experienceList={data.experience.edges} />
      <SideProjectsListSection sideProjectsList={data.sideProjects.edges} />
      <OtherSectionsList sectionList={data.otherSections.edges} />
    </Layout>
  );
};

export const query = graphql`
  query {
    file(relativePath: { eq: "me.jpeg" }) {
      childImageSharp {
        fixed(width: 100, height: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    experience: allMarkdownRemark(
      sort: { order: DESC, fields: frontmatter___to_date }
      filter: { fileAbsolutePath: { glob: "**/content/resume/experience/*" } }
    ) {
      edges {
        node {
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
