import React, { Component, Fragment } from 'react'
import Helmet from 'react-helmet'
import api from 'api'
import search from 'search'
import { Heading, Container, Card, LargeButton } from '@hackclub/design-system'
import styled from 'styled-components'

import Login from 'components/auth/Login'
import Sheet from 'components/Sheet'
import ApplyNav from 'components/apply/ApplyNav'
import LoadingBar from 'components/LoadingBar'
import BG from 'components/BG'
import LeaderApplicationForm from 'components/apply/LeaderApplicationForm'

export default class extends Component {
  state = {
    status: 'loading',
    formFields: undefined,
    id: undefined
  }

  componentDidMount() {
    const id = search.get('id')
    this.setState({ id })
    api
      .get(`v1/leader_profiles/${id}`)
      .then(json => (
        api.get(`v1/new_club_applications/${json.new_club_application_id}`).then(newClubApp => {
          this.setState({
            status: 'loaded',
            formFields: {...json, submitted_at: newClubApp.submitted_at}
          })
        })
      ))
      .catch(e => {
        if (e.status === 401) {
          const status = 'needsToAuth'
          this.setState({ status })
        }
        alert(e.statusText)
      })
  }

  content() {
    const { status, formFields, id } = this.state

    switch (status) {
      case 'needsToAuth':
        return <Login />
      case 'loading':
        return <LoadingBar fill />
      default:
        return (
          <Fragment>
            <ApplyNav />
            <BG color="snow" />
            <Sheet mt={3} mb={5}>
              <LeaderApplicationForm
                params={formFields}
                id={id}
              />
            </Sheet>
            <Heading.h4 align="center">
              Your form is automatically saved ✨
            </Heading.h4>
            <Container align="center" mt={4} mb={5}>
              <LargeButton.link to="/apply">« Back</LargeButton.link>
            </Container>
          </Fragment>
        )
    }
  }

  render() {
    return (
      <Fragment>
        <Helmet title="Edit Leader Application – Hack Club" />
        {this.content()}
      </Fragment>
    )
  }
}
