import React from "react"
import styles from "./header-navigation.module.css"

console.log(styles)

const renderNavigationElements = links =>
  links.map(({ text, link }) => {
    return (
      <li className={styles.navElement} key={link}>
        <a href={link} alt={text}>
          {text}
        </a>
      </li>
    )
  })

const HeaderNavigation = ({ links }) => {
  return <ul>{renderNavigationElements(links)}</ul>
}

export default HeaderNavigation
