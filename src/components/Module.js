import React from 'react'
import { Flex, Icon, Heading, Text } from '@hackclub/design-system'
import PropTypes from 'prop-types'

const Module = ({ icon, heading, name, body, ...props }) => (
  <Flex flexDirection={['row', 'column']} {...props}>
    <Icon
      size={48}
      mr={[3, null, 0]}
      mb={1}
      name={icon}
      color={props.color || 'inherit'}
      style={{ flexShrink: 0 }}
    />
    <div>
      <Heading.h3 mb={1} f={3} children={heading || name} />
      <Text m={0} f={2} children={body} />
    </div>
  </Flex>
)

Module.displayName = 'Module'

Module.propTypes = {
  icon: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  name: PropTypes.string, // TODO(lachlanjc): migrate everything to name
  body: PropTypes.string
}

export default Module
