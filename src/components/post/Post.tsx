import React from "react";
import { Link } from "gatsby";
import { postTitle, date } from "./post.module.css";

interface Post {
  excerpt?: string | null;
  fields?: { slug?: string | null } | null;
  frontmatter?: {
    date?: any | null;
    title?: string | null;
    description?: string | null;
  } | null;
}

interface PostProps {
  title: string;
  post: Post;
}

export const Post: React.FC<PostProps> = ({ post, title }) => {
  return (
    <li key={post?.fields?.slug}>
      <article
        className="post-list-item"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <small className={date}>{post?.frontmatter?.date}</small>
          <h2 className={postTitle}>
            <Link to={post?.fields?.slug || '/blog'} itemProp="url">
              <span itemProp="headline">{title}</span>
            </Link>
          </h2>
        </header>
      </article>
    </li>
  );
};
