import * as React from "react";
import { Link, graphql, PageProps } from "gatsby";

import Bio from "@Components/Bio";
import { Layout } from "@Components/Layout/Layout";
import { Seo } from "@Components/Seo/Seo";
import { container, date } from "./BlogPost.module.css";
import { BlogPostBySlugQuery } from "../../graphql-types";

const BlogPostTemplate: React.FC<PageProps<BlogPostBySlugQuery>> = ({
  data,
  location,
}: any) => {
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const { previous, next } = data;

  return (
    <Layout
      showName
      location={location}
      title={siteTitle}
      className={container}
    >
      <Seo
        type="article"
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        meta={[
          {
            property: "article:published_time",
            content: post.frontmatter.date,
          },
          {
            name: "author",
            content: data.site.siteMetadata?.author.name,
          },
        ]}
      />
      <article itemScope itemType="http://schema.org/Article">
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p className={date}>{post.frontmatter.date}</p>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
        author {
          name
        }
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;
