import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import HeaderNavigation from "./header-navigation"
import styles from "./header.module.css"

const Header = ({ siteTitle }) => (
  <header className={styles.container}>
    <h1 className={styles.author}>Riccardo Coppola</h1>
    <nav>
      <HeaderNavigation
        links={[
          { text: "About", link: "/" },
          { text: "Blog", link: "https://onefiniteloop.io" },
          { text: "GitHub", link: "https://github.com/ricca509" },
          {
            text: "Finite Loop LTD",
            link: "https://www.onefiniteloop.io/services/",
          },
        ]}
      />
    </nav>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
