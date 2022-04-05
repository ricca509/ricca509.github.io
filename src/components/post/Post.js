import React from "react";
import { Link } from "gatsby";
import { postTitle, postDescription, date } from "./post.module.css";

export const Post = ({ post, title }) => {
  return (
    <li key={post.fields.slug}>
      <article
        className="post-list-item"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <small className={date}>{post.frontmatter.date}</small>
          <h2 className={postTitle}>
            <Link to={post.fields.slug} itemProp="url">
              <span itemProp="headline">{title}</span>
            </Link>
          </h2>          
        </header>
        {/* <section>
          <p
            className={postDescription}
            dangerouslySetInnerHTML={{
              __html: post.frontmatter.description || post.excerpt,
            }}
            itemProp="description"
          />
        </section> */}
      </article>
    </li>
  );
};
