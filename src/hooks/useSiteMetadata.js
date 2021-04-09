import { graphql, useStaticQuery } from "gatsby"

export const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SITE_METADATA_QUERY {
        site {
          siteMetadata {
            defaultDescription: description
            defaultImage: image
            siteUrl
            siteLanguage
            siteLocale
            authorName
            designation
            twitterUsername
            githubUsername
            linkedinUsername
          }
        }
      }
    `
  )
  return site.siteMetadata
}
