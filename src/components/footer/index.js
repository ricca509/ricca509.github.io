import React from "react";
import SocialNavigation from "../social-navigation";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.social}>
        <SocialNavigation />
      </div>
      <div>
        <p>© {new Date().getFullYear()} Riccardo Coppola</p>
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

export default Footer;
