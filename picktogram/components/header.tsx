import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'

interface UserInfo {
  nickname : string
}

const HeaderContainer = styled.header`
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border: 1px solid black;
`

export default function Header() {
  const [user, setUser] = useState<UserInfo | null>(null)

  useEffect(() => {
    const base64Payload  = localStorage.getItem('token')?.split('.')[1]
    const payload = Buffer.from(base64Payload , 'base64')
    const userData = JSON.parse(payload.toString())
    setUser(userData)
  }, [user])


  return (
    <HeaderContainer>
        <div>Logo</div>
        <div>menu</div>
        <div>
          <h3>user detail</h3>
          { user ? <div>안녕하세요 : {user.nickname}님</div> : <div>로그인 해주세요.</div>}
          <div>환영합니다!</div>
        </div>
    </HeaderContainer>
  )
}
