import React from 'react'
import { Text } from '@hackclub/design-system'

const ErrorPage = (props?: Object) => (
  <Text color="error" py={3} align="center" {...props}>
    🚨 Something terrible has happened 🚨
    <br />
    Please let us know about this by emailing us at{' '}
    <a href="mailto:itsbroken@hackclub.com">itsbroken@hackclub.com</a>
  </Text>
)
export default ErrorPage
