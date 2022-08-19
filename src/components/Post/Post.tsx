import React from "react";
import { Link } from "gatsby";
import { postTitle, date, container } from "./Post.module.css";

interface Post {
  excerpt?: string | null;
  fields?: { slug?: string | null } | null;
  frontmatter?: {
    date?: any | null;
    title?: string | null;
    description?: string | null;
    tags?: string | null;
  } | null;
}

interface PostProps {
  title: string;
  post: Post;
}

export const Post: React.FC<PostProps> = ({ post, title }) => {
  const tags = post.frontmatter?.tags?.split(",");
  return (
    <li key={post?.fields?.slug}>
      <article
        className={container}
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <small className={date}>{post?.frontmatter?.date}</small>
          <h2 className={postTitle}>
            <Link to={post?.fields?.slug || "/blog"} itemProp="url">
              <span itemProp="headline">{title}</span>
            </Link>
          </h2>
          {post.frontmatter?.tags && (
            <div>
              <span
                style={{
                  fontSize: "14px",
                  color: "var(--purple)",
                  fontFamily: "var(--blog-font-family)",
                }}
              >
                {tags?.map((tag) => `#${tag.trim()} `)}
              </span>
            </div>
          )}
        </header>
      </article>
    </li>
  );
};
