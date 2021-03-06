import React from "react"
import { Link } from "gatsby"
import { Section, Container, Title, Image, Column, Card, Generic } from "rbx"
import { IconSelector } from "../components/IconSelector"
import { StyledCard } from "../components/StyledCard"
import { StyledImage } from "../components/StyledImage"
import { useProjects } from "../hooks/useProjects"
import SEOComponent from "../components/SEOComponent"

const Projects = () => {
  const projects = useProjects()

  return (
    <>
      <SEOComponent title="Projects" />
      <Section className="navbar-margin">
        <Container>
          <Title as="h1">
            <IconSelector icon="chevright" /> All projects
          </Title>
          <Column.Group multiline centered>
            {projects.map(({ id, excerpt, frontmatter, fields }) => (
              <Column size="one-third-desktop half-tablet" key={id}>
                <Link to={`/projects${fields.slug}`}>
                  <StyledCard className="card-equal-height">
                    <Card.Image>
                      {!!frontmatter.cover ? (
                        <Image.Container>
                          <StyledImage
                            fluid={{
                              ...frontmatter.cover.childImageSharp.fluid,
                              aspectRatio: 16 / 9,
                            }}
                          />
                        </Image.Container>
                      ) : null}
                    </Card.Image>
                    <Card.Header>
                      <Card.Header.Title align="centered">
                        <Title as="h2" size={4}>
                          {frontmatter.title}
                        </Title>
                      </Card.Header.Title>
                    </Card.Header>
                    <Card.Content>
                      <Title as="p" subtitle size={5}>
                        {excerpt.substring(frontmatter.title.length)}
                      </Title>
                    </Card.Content>
                    <Card.Footer
                      as="footer"
                      className="card-equal-height card-footer"
                    >
                      <Card.Footer.Item as="p">
                        {!!frontmatter.tags
                          ? frontmatter.tags.map(tag => {
                              return (
                                <Generic
                                  as="span"
                                  tooltip={tag}
                                  tooltipColor="black"
                                  textColor="primary"
                                  key={tag}
                                >
                                  <IconSelector
                                    icon={tag}
                                    style={{ margin: "0.5em" }}
                                  />
                                </Generic>
                              )
                            })
                          : null}
                      </Card.Footer.Item>
                    </Card.Footer>
                  </StyledCard>
                </Link>
              </Column>
            ))}
          </Column.Group>
        </Container>
      </Section>
    </>
  )
}

export default Projects;