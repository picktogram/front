import React from 'react'
import styled from '@emotion/styled'

const FooterContainer = styled.footer`
    width: 100%;
    position: fixed;
    bottom: 0;
    text-align: center;
    border : 1px solid black;
`

export default function Footer() {
  return (
    <FooterContainer>footer</FooterContainer>
  )
}
