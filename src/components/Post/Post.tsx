import React from "react";
import { Link } from "gatsby";

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
          <small className="text-gray-500">{post?.frontmatter?.date}</small>
          <h2 className="font-light text-xl mt-0 mb-5">
            <Link to={post?.fields?.slug || "/blog"} itemProp="url">
              <span itemProp="headline">{title}</span>
            </Link>
          </h2>
        </header>
      </article>
    </li>
  );
};
