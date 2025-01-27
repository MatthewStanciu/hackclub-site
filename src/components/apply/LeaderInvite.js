import React, { Component, Fragment } from 'react'
import { Flex, IconButton, Text } from '@hackclub/design-system'
import styled, { css } from 'styled-components'
import LeaderInviteForm from 'components/apply/LeaderInviteForm'

const SectionIcon = styled(IconButton).attrs({
  bg: props => (props.open ? 'gray.5' : 'success'),
  size: 24,
  ml: 'auto',
  mr: 1,
  circle: true
})`
  transition: ${({ theme }) => theme.transition} all;
  transform: rotate(${props => (props.open ? -45 : 0)}deg);
  user-select: none;
  box-shadow: ${({ theme }) => theme.boxShadows[0]} !important;
  &:hover,
  &:focus {
    box-shadow: ${({ theme }) => theme.boxShadows[1]} !important;
  }
`

class LeaderInvite extends Component {
  state = { open: false }

  toggle = e => this.setState(({ open }) => ({ open: !open }))

  render() {
    const { open } = this.state
    return (
      <Fragment>
        <Flex align="center" aria-expanded={open} mt={3} mb={2}>
          <Text f={4} color="muted" bold caps>
            Co-leaders
          </Text>
          <SectionIcon open={open} name="add" onClick={this.toggle} />
        </Flex>
        {open && <LeaderInviteForm {...this.props} />}
      </Fragment>
    )
  }
}

export default LeaderInvite
