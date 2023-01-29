import React, { useEffect, useState , useContext} from 'react'
import styled from '@emotion/styled'
import {userInfoContext} from "@/context/userInfoContext"

interface StyleProps {
  background : boolean
}


const HeaderContainer = styled.header<StyleProps>`
    position : fixed;
    top : 0;
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid black;
    background-color: ${props => props.background ? "black" : "transparent "};
    color : ${props => props.background ? "white" : "black "};
    transition: all .3s ease;
`

export default function Header() {
  const { nickname } = useContext(userInfoContext)
  const [isShow, setIsShow] = useState<boolean>(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        setIsShow(true);
      } else {
        setIsShow(false);
      }
    });

    return () => {
      window.removeEventListener('scroll', () => {});
    };
  }, [])


  return (
    <HeaderContainer background={isShow}>
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
