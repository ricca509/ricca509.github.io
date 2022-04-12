import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { Layout } from "@Components/Layout/Layout";
import Seo from "@Components/Seo/Seo";
import { NotFoundPageQuery } from "../../graphql-types";

const NotFoundPage: React.FC<PageProps<NotFoundPageQuery>> = ({
  data,
  location,
}) => {
  const siteTitle = data?.site?.siteMetadata?.title;

  return (
    <Layout location={location} title={siteTitle || ""}>
      <Seo title="404: Not Found" />
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  );
};

export default NotFoundPage;

export const pageQuery = graphql`
  query NotFoundPage {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
