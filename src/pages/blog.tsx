import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { BlogIndexQuery } from "../../graphql-types";

import Bio from "../components/Bio";
import Layout from "../components/Layout";
import { Seo } from "../components/Seo";
import { Post } from "../components/Post/Post";
import { list } from "./blog.module.css";

const BlogIndex: React.FC<PageProps<BlogIndexQuery>> = ({ data, location }) => {
  const siteTitle = data?.site?.siteMetadata?.title || `Blog`;
  const posts = data.allMarkdownRemark.nodes;

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="Blog" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    );
  }

  return (
    <Layout showName location={location} title={siteTitle}>
      <Seo title="Blog" />
      <Bio />
      <ol className={list}>
        {posts.map((post) => {
          const title = post?.frontmatter?.title || post?.fields?.slug;

          return <Post post={post} title={title || ''} />;
        })}
      </ol>
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query BlogIndex {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fields: { slug: { glob: "**/blog/*" } }
        frontmatter: { publication_status: { eq: "published" } }
      }
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`;
