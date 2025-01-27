import React from 'react'
import { Flex, Icon, Text } from '@hackclub/design-system'
import Link from 'gatsby-link'

const Base = Flex.withComponent(Link).extend`
  border-radius: ${({ theme }) => theme.radius};
  max-width: 28rem;
`
Base.defaultProps = {
  mt: -2,
  mb: [4, 5],
  mx: 'auto',
  bg: 'blue.0',
  p: [2, 3],
  justify: 'flex-start',
  align: 'center'
}

const ChallengeBanner = () => (
  <Base to="/challenge">
    <Text bold color="info" f={3} mr={2}>
      Check out projects built by students
    </Text>
    <Icon name="open_in_new" size={28} ml="auto" color="info" />
  </Base>
)

export default ChallengeBanner
