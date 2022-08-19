/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

interface SeoProps {
  description?: string;
  lang?: string;
  meta?: any[];
  title: string;
  /** Used for og:type */
  type?: string;
  customMeta?: React.DetailedHTMLProps<
    React.MetaHTMLAttributes<HTMLMetaElement>,
    HTMLMetaElement
  >[];
}

export const Seo: React.FC<SeoProps> = ({
  description,
  lang = "en",
  meta = [],
  title,
  type = "website",
}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            social {
              twitter
            }
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;
  const defaultTitle = site.siteMetadata?.title;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={defaultTitle && `%s - ${defaultTitle}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:locale`,
          content: "en_US",
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: type,
        },
        {
          property: `og:site_name`,
          content: defaultTitle,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata?.social?.twitter || ``,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    ></Helmet>
  );
};

export default Seo;
