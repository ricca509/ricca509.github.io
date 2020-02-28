import React from "react";
import { StaticQuery, graphql } from "gatsby";
import styles from "./footer.module.css";

const Footer = ({ data }) => {
  return (
    <footer className={styles.footer}>
      <div>© {new Date().getFullYear()} Finite Loop LTD</div>
      <div>
        This application is built with{" "}
        <a href="https://www.gatsbyjs.org/" alt="Gatsby link">
          Gatsby
        </a>{" "}
        and hosted on GitHub pages, take a look at the{" "}
        <a
          href="https://github.com/ricca509/ricca509.github.io"
          alt="GitHub repository"
          target="blank"
        >
          source code on GitHub
        </a>
        .
      </div>
    </footer>
  );
};

export default props => (
  <StaticQuery
    query={graphql`
      query {
        file(relativePath: { eq: "github.png" }) {
          childImageSharp {
            fixed(width: 64, height: 64) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `}
    render={data => <Footer data={data} {...props} />}
  />
);
