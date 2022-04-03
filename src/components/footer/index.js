import React from "react"
import SocialNavigation from "../social-navigation"
import { footer } from "./footer.module.css"

const Footer = () => {
  return (
    <footer className={footer}>
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
    </footer>
  )
}

export default Footer
