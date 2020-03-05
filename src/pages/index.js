import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import AboutMe from "../components/about-me";
import WorkExperience from "../components/work-experience";
import SideProject from "../components/side-project";
import GenericSection from "../components/generic-section";
import Markdown from "markdown-to-jsx";

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" />
      <AboutMe body={data.about.html} image={data.file.childImageSharp.fixed} />
      <h2>
        Experience{" "}
        <span role="img" aria-label="experience">
          💼
        </span>
      </h2>
      {data.experience.edges.map(({ node }) => {
        return (
          <WorkExperience
            key={node.id}
            company={node.frontmatter.company}
            role={node.frontmatter.role}
            dates={`${node.frontmatter.from_date} - ${node.frontmatter.to_date}`}
            description={node.html}
            technologies={node.frontmatter.technologies}
          />
        );
      })}
      <h2>Side projects</h2>
      {data.sideProjects.edges.map(({ node }) => {
        return (
          <SideProject
            key={node.id}
            title={node.frontmatter.title}
            link={node.frontmatter.link}
            description={node.html}
          />
        );
      })}
      {data.otherSections.edges.map(({ node }) => {
        return (
          <GenericSection title={node.frontmatter.title}>
            {node.html}
          </GenericSection>
        );
      })}
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
