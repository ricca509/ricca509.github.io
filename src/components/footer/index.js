import React from "react";
import { StaticQuery, graphql } from "gatsby";
import SocialNavigation from "../social-navigation";
import styles from "./footer.module.css";

const Footer = ({ data }) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.social}>
        <SocialNavigation />
      </div>
      <div>
        <p>© {new Date().getFullYear()} Finite Loop LTD</p>
        <p>
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
        </p>
      </div>
    </footer>
  );
};

export default props => (
  <StaticQuery
    query={graphql`
      query {
        allFile(
          filter: {
            relativePath: {
              in: ["finiteloop-icon.png", "improvedhumans-icon.png"]
            }
          }
        ) {
          edges {
            node {
              childImageSharp {
                fixed(width: 40, height: 40) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    `}
    render={data => <Footer data={data} {...props} />}
  />
);
