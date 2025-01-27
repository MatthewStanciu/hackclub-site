import React from 'react'
import styled, { css } from 'styled-components'
import Link from 'gatsby-link'

const Flag = styled(Link)`
  background: url(/orpheus_flag.svg) no-repeat;
  background-position: top center;
  flex-shrink: 0;
  width: 112px;
  height: 48px;
  transition: ${({ theme }) => theme.transition} transform;
  transform-origin: top left;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 144px;
    height: 72px;
  }
  ${props =>
    props.scrolled &&
    css`
      transform: scale(0.75);
      height: 44px !important;
      ${({ theme }) => theme.mediaQueries.md} {
        height: 54px !important;
      }
    `};
`
Flag.defaultProps = {
  to: '/',
  'aria-label': 'Homepage'
}

export default Flag
