import React from "react"
import Markdown from "markdown-to-jsx"

const FormerExperience = ({ year, title, description }) => {
  return (
    <li>
      <em>
        {year}: <Markdown>{title}</Markdown>
      </em>
      <p>
        <Markdown>{description}</Markdown>
      </p>
    </li>
  )
}

export default FormerExperience
