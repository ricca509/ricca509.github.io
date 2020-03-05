import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import AboutMe from "../components/about-me";
import WorkExperience from "../components/work-experience";
import SideProject from "../components/side-project";
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
      <h2>Spoken languages</h2>
      <p>Italian, English, basic Spanish.</p>
      <h2>Education</h2>
      <p>
        2002 - 2007: Degree in Telecommunications Engineering with the thesis:
        “AODV protocol modifications to include Link State metrics”
      </p>
      <h2>Interests</h2>
      <Markdown>
        {`I blog about development, agile methodologies, psychology of teamwork and other boring topics at [onefiniteloop.io](https://www.onefiniteloop.io/).

Certified Level 3 Personal trainer and Level 2 Gym instructor; sport nutrition geek and biohacker at [improvedhumans.com](https://www.improvedhumans.com/).

Trained barista and coffee roaster.

Amateur photographer [500px.com/ricca509](https://500px.com/ricca509).`}
      </Markdown>
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
          sort: { order: DESC, fields: frontmatter___to_date }
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
