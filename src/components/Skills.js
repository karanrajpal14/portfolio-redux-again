import React from "react"
import { Title, Section, Column, Container, Box, Generic, Block } from "rbx"
import { IconSelector } from "./IconSelector"

export const Skills = () => {
  return (
    <Section className="primary-light-bg" id="skills">
      <Column size="half" offset="one-quarter">
        <Title as="h2">
          <IconSelector icon="chevright" /> Skills I've learned
        </Title>
        <Container fluid>
          {/* JavaScript Section */}
          <Column.Group centered vcentered>
            <Column size="full" textAlign="centered">
              <IconSelector icon="javascript" />
              <Title>JavaScript</Title>
              <Block />
              <Column.Group breakpoint="mobile" centered multiline>
                <Column narrow>
                  <Generic as={Box} textAlign="centered">
                    <IconSelector icon="react" />
                    <Title size="4" textAlign="centered">
                      ReactJS
                    </Title>
                  </Generic>
                </Column>
                <Column narrow>
                  <Generic as={Box} textAlign="centered">
                    <IconSelector icon="node" />
                    <Title size="4" textAlign="centered">
                      NodeJS
                    </Title>
                  </Generic>
                </Column>
                <Column narrow>
                  <Generic as={Box} textAlign="centered">
                    <IconSelector icon="gatsby" />
                    <Title size="4" textAlign="centered">
                      GatsbyJS
                    </Title>
                  </Generic>
                </Column>
                <Column narrow>
                  <Generic as={Box} textAlign="centered">
                    <IconSelector icon="jquery" />
                    <Title size="4" textAlign="centered">
                      jQuery
                    </Title>
                  </Generic>
                </Column>
              </Column.Group>
            </Column>
          </Column.Group>

          {/* Python Section */}
          <Column.Group centered vcentered>
            <Column size="full" textAlign="centered">
              <IconSelector icon="python" />
              <Title>Python</Title>
              <Block />
              <Column.Group breakpoint="mobile" centered multiline>
                <Column narrow>
                  <Generic as={Box} textAlign="centered">
                    <IconSelector icon="django" />
                    <Title size="4" textAlign="centered">
                      Django
                    </Title>
                  </Generic>
                </Column>
                <Column narrow>
                  <Generic as={Box} textAlign="centered">
                    <IconSelector icon="flask" />
                    <Title size="4" textAlign="centered">
                      Flask
                    </Title>
                  </Generic>
                </Column>
              </Column.Group>
            </Column>
          </Column.Group>

          {/* Java Section */}
          <Column.Group centered vcentered>
            <Column size="full" textAlign="centered">
              <IconSelector icon="java" />
              <Title textAlign="centered">Java</Title>
              <Block />
              <Column.Group breakpoint="mobile" centered multiline>
                <Column narrow>
                  <Generic as={Box} textAlign="centered">
                    <IconSelector icon="spring" />
                    <Title size="4" textAlign="centered">
                      Spring
                    </Title>
                  </Generic>
                </Column>
                <Column narrow>
                  <Generic as={Box} textAlign="centered">
                    <IconSelector icon="android" />
                    <Title size="4" textAlign="centered">
                      Android
                    </Title>
                  </Generic>
                </Column>
              </Column.Group>
            </Column>
          </Column.Group>
        </Container>
      </Column>
    </Section>
  )
}
