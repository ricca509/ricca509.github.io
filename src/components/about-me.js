import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import Markdown from "markdown-to-jsx";

const description = `
#Hello,

#my name is [Riccardo Coppola](mailto:hello@ricca509.me)

I am a passionate, detail oriented Full Stack JavaScript developer who can easily wear the DevOps hat.

I have strong experience writing state of art web applications using best practices, design patterns and performance testing, following a TDD/BDD approach.

Team player, I have extensive, hands-on experience with Agile methodologies (Kanban/Scrum/XP/pair programming), building cross-functional teams on site and in distributed environments ([onefiniteloop.io/embrace-distributed-teams-and-be-happy](https://www.onefiniteloop.io/embrace-distributed-teams-and-be-happy/)). Strong believer in the value of productivity as a result of highly efficient workflows, I can happily act as developer advocate to help break down obstacles and enable developers to increase velocity.

I love challenging and creative environments where I can support the growth of other developers, improve the projects I work on and craft code that others love to read and maintain.

I regularly attend meetups in the London tech scene such as London Web, London React User Group and London Node User Group.

Increasingly interested in blockchain technologies and their applications to solve real world scenarios and improve people lives.

I ♥ what I do.
`;

const AboutMe = ({ data }) => {
  return (
    <>
      {/* <Img
        imgStyle={{
          height: "85px",
          width: "85px",
          position: "relative",
          margin: "-10px 0 0 15px",
          float: "right",
          borderRadius: "50%",
        }}
        fixed={data.file.childImageSharp.fixed}
      /> */}
      <Markdown>{description}</Markdown>
    </>
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
      }
    `}
    render={data => <AboutMe data={data} {...props} />}
  />
);
