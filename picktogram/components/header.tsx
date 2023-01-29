import React, { useEffect, useState , useContext} from 'react'
import styled from '@emotion/styled'
import {userInfoContext} from "@/context/userInfoContext"


const HeaderContainer = styled.header`
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border: 1px solid black;
`

export default function Header() {

  const {nickname} = useContext(userInfoContext)

  return (
    <HeaderContainer>
        <div>Logo</div>
        <div>menu</div>
        <div>
          <h3>user detail</h3>
          { nickname !== "" ? <div>안녕하세요 : {nickname}님</div> : <div>로그인 해주세요.</div>}
          <div>환영합니다!</div>
        </div>
    </HeaderContainer>
  )
}
