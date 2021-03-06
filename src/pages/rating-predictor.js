import React from "react"
import { Link } from "gatsby"
import { Formik, Form, Field as FormikField, ErrorMessage } from "formik"
import {
  Field,
  Label,
  Control,
  Help,
  Icon,
  Textarea,
  Button,
  Container,
  Section,
  Column,
  Card,
  Content,
  Generic,
  Title,
  Notification,
  Delete,
} from "rbx"
import * as yup from "yup"
import axios from "axios"
import { IconSelector } from "src/components/IconSelector"

const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export default class RatingPredictor extends React.Component {
  state = {
    submitSuccessHidden: true,
    submitErrorHidden: true,
    rating: null,
  }

  copyCodeToClipboard = () => {
    const el = this.textArea
    el.select()
    document.execCommand("copy")
  }

  toggleSuccess = async rating => {
    this.setState({
      submitSuccessHidden: false,
      submitErrorHidden: true,
      rating,
    })
    await sleep(100000)
    this.setState({
      submitSuccessHidden: true,
      submitErrorHidden: true,
      rating: null,
    })
  }

  toggleError = async () => {
    this.copyCodeToClipboard()
    this.setState({
      submitSuccessHidden: true,
      submitErrorHidden: false,
    })
    await sleep(100000)
    this.setState({
      submitSuccessHidden: true,
      submitErrorHidden: true,
    })
  }

  alpha = /^[a-zA-Z_]+( [a-zA-Z_]+)*$/

  contactSchema = yup.object().shape({
    review: yup.string(),
  })

  handleOnSubmit = (values, actions) => {
    let bodyFormData = new FormData()
    bodyFormData.set("review", values.review)

    axios({
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      url: "https://rating-predictor.herokuapp.com/predict/",
      data: bodyFormData,
    })
      .then(response => {
        let rating = response.data.rating
        actions.setSubmitting(false)
        this.toggleSuccess(rating)
      })
      .catch(error => {
        actions.setSubmitting(false)
        this.toggleError()
      })
  }

  render() {
    return (
      <>
        <Section id="contact" className="primary-light-bg">
          <Generic as={Container} textAlign="centered">
            <Column.Group centered>
              <Column size="half">
                <Card id="contact-card">
                  <Card.Content as={Content}>
                    <Title as="h2" textAlign="centered" spaced>
                      Rating Predictor
                    </Title>
                    <Title subtitle as="h2" textAlign="centered" spaced>
                      Predicting rating for reviews using a ML model. Built
                      using Flask and Gatsby for my Data Mining course at UTA.
                      You can read more about it <Link to="/">here</Link>.
                    </Title>
                    <Generic as="p" textSize={4}>
                      Just type a review for any game and I will predict a
                      rating for your review.
                    </Generic>
                    <Formik
                      initialValues={{
                        review: "",
                      }}
                      validationSchema={this.contactSchema}
                      onSubmit={this.handleOnSubmit}
                      render={formProps => {
                        return (
                          <Form>
                            <Field horizontal>
                              <Field.Label>
                                <Label>Review</Label>
                              </Field.Label>
                              <Field.Body>
                                <Field>
                                  <Control expanded>
                                    <Textarea
                                      name="review"
                                      as={FormikField}
                                      component="textarea"
                                      innerRef={textarea =>
                                        (this.textArea = textarea)
                                      }
                                      placeholder="Enter your review"
                                    />
                                    <Help color="black" as="div">
                                      <ErrorMessage
                                        name="review"
                                        component="p"
                                      />
                                    </Help>
                                  </Control>
                                </Field>
                              </Field.Body>
                            </Field>
                            <Field horizontal>
                              <Field.Body>
                                <Field>
                                  <Control>
                                    <Button.Group align="centered">
                                      <Button
                                        type="submit"
                                        className="primary-bg"
                                        size="medium"
                                      >
                                        <Icon size="small" align="left">
                                          <IconSelector
                                            icon="send"
                                            size="1em"
                                          />
                                        </Icon>
                                        <span>Send</span>
                                      </Button>
                                    </Button.Group>
                                  </Control>
                                </Field>
                              </Field.Body>
                            </Field>
                            <Notification
                              color="success"
                              hidden={this.state.submitSuccessHidden}
                            >
                              <Delete
                                as="button"
                                onClick={this.toggleSuccess}
                              />
                              <Generic as="p" size={2} textWeight="semibold">
                                Predicted rating = {this.state.rating}
                              </Generic>
                            </Notification>
                            <Notification
                              color="danger"
                              hidden={this.state.submitErrorHidden}
                            >
                              <Delete as="button" onClick={this.toggleError} />
                              <Generic as="p" size={3} textWeight="semibold">
                                Uh oh! Looks like there was a problem predicting
                                a rating for the review.
                              </Generic>
                              <Generic as="p" size={3} textWeight="semibold">
                                Sorry about that. Mind trying again?
                              </Generic>
                              <Generic as="p" size={3} textWeight="semibold">
                                Your review is copied to the clipboard ;)
                              </Generic>
                            </Notification>
                          </Form>
                        )
                      }}
                    />
                  </Card.Content>
                </Card>
              </Column>
            </Column.Group>
          </Generic>
        </Section>
      </>
    )
  }
}
