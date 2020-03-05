import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import AboutMe from "../components/about-me";
import SideProjectsListSection from "../components/side-projects-list-section";
import WorkExperienceListSection from "../components/work-experience-list-section";
import OtherSectionsList from "../components/other-sections-list";

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

export default props => (
  <StaticQuery
    query={graphql`
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
          filter: {
            fileAbsolutePath: { glob: "**/content/resume/experience/*" }
          }
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
    `}
    render={data => <IndexPage data={data} {...props} />}
  />
);
