import React from "react"
import Markdown from "markdown-to-jsx"

const WorkExperience = ({
  company,
  role,
  dates,
  description,
  technologiesArray,
}) => {
  return (
    <>
      <h3>{company}</h3>
      <p>
        <strong>{role}</strong>
      </p>
      <p>
        <em>{dates}</em>
      </p>
      <Markdown>{description}</Markdown>
      {technologiesArray && (
        <div>
          <strong>Key Technologies used:</strong>
          <p>{technologiesArray.join(", ")}</p>
        </div>
      )}
    </>
  )
}

export default WorkExperience
