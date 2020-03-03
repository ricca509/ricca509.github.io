import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import Markdown from "markdown-to-jsx";
import style from "./about-me.module.css";

const TitleComponent = ({ children }) => {
  return <h1 className={style.title}>{children}</h1>;
};

const AboutMe = ({ title, body, image }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Img
        imgStyle={{
          borderRadius: "50%",
        }}
        fixed={image}
      />
      <Markdown
        options={{
          overrides: {
            h1: {
              component: TitleComponent,
            },
          },
        }}
      >
        {title}
      </Markdown>
      <Markdown>{body}</Markdown>
    </div>
  );
};

export default AboutMe;
