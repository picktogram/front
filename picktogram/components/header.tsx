import React from 'react'
import styled from '@emotion/styled'

const HeaderContainer = styled.header`
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid black;
`

export default function Header() {
  return (
    <HeaderContainer>
        <div>Logo</div>
        <div>menu</div>
        <div>user detail</div>
    </HeaderContainer>
  )
}
