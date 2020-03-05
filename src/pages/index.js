import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import AboutMe from "../components/about-me";
import WorkExperience from "../components/work-experience";
import SideProject from "../components/side-project";
import Markdown from "markdown-to-jsx";

const acidSeed = {
  title: `Acidseed [github.com/ricca509/acidseed](https://github.com/ricca509/acidseed)`,
  description: `A caching layer to cache any API/HTTP request. Written in Node.js using ES6 Harmony with persistence on Redis.`,
};

const f = {
  title: `F.js [github.com/ricca509/F](https://github.com/ricca509/F)`,
  description: `A small library to be used in all those multiple pages (server side MVC) projects that usually don’t have a structured js due to the fact that most of the job is done on the server. It is “A small, modular library that helps writing structured, reusable, testable and namespaced JavaScript code. It also provides DOM helpers and a pub/sub implementation”. Published in the Bower repository.`,
};

const phood = {
  title: `Phood mobile app`,
  description: `A small mobile application that uses the Yummly.com REST API to search recipes and presents them to the user with a useful visual. Built using ES6 syntax with the Traceur compiler, HTML5/CSS3/SASS, Stylus templates, Nodejs/Express, Marionette.js/Backbonejs/underscorejs, Bower, jQuery, Bootstrap, Git.`,
};

const triptapp = {
  title: `TripTapp.com`,
  description: `Co-founder of [triptapp.com](https://www.triptapp.com): we developed the web application and designed the mobile application. The webapp development involved social authentication, a NoSQL database (mongoDB), an API to interface with Google Maps, a client side app to handle data about places positions, like, etc and a REST API to handle AJAX calls. The mobile app used a REST API in Node.js as backend and HTML5 with Backbone.js (accessing the device’s features through Cordova/PhoneGap). Built using HTML5/CSS3, LESS, Backbone.js, jQuery, Twitter Bootstrap, Yii Framework (PHP), mongoDB. Integrated with Google Maps, Hosted on Windows Azure (Linux VM).`,
};

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
      <SideProject {...acidSeed} />
      <SideProject {...f} />
      <SideProject {...phood} />
      <SideProject {...triptapp} />
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
