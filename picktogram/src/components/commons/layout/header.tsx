import React from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userModalState } from '@/state/userModalState'
import { searchBarState } from '@/state/searchBarState';
import { useRouter } from "next/router"
import { mediaQuery } from '@/styles/media';

import styled from '@emotion/styled'
import useCurrentUser from '@/src/hooks/useCurrentUser';

import UserModal from '../modals/userModal';
import ProfileImage from '../profileImage';

export default function Header({token} : {token : string}) {
  const setShowModal = useSetRecoilState(userModalState)
  const [showSearchBar, setShowSearchBar] = useRecoilState(searchBarState)

  const router = useRouter()
  const user = useCurrentUser(token as string)

  if(!user) {
    <div>로딩중..</div>
  }

  return (
    <HeaderContainer>
        {/* 로고 */}
        <Logo onClick={() => router.push("/")}>Picktogram</Logo>

        {/* 검색창 */}
        <SearchBar showSearchBar={showSearchBar} onSubmit={(e) => e.preventDefault()}>
          <SearchInput type="search" showSearchBar={showSearchBar}/>
          <SearchButton onClick={() => { setShowSearchBar(!showSearchBar) }} showSearchBar={showSearchBar}>
            <i className="ri-search-line"></i>
            <SearchClose showSearchBar={showSearchBar}>X</SearchClose>
          </SearchButton>
        </SearchBar>

        {/* 유저 정보 */}
        <UserInfo>
          <ProfileImage
            onClick={() => setShowModal((prev) => !prev)}
            isCircle={true}
            profileImage={user?.profileImage}
          />
          <Welcome>안녕하세요. {user?.nickname} 디자이너님 환영합니다!</Welcome>
        </UserInfo>
        <UserModal userId={user?.id} profileImage={user?.profileImage} username={user?.nickname}/>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.header`
    position : sticky;
    top : 0;
    width: 100%;
    height: 100px;
    padding: 16px;
    background-color: white;
    color : black;
    transition: all .3s ease;
    z-index: 100;
    border-bottom: 1px solid lightgray;
`

const Logo = styled.div`
    position: absolute;
    left: 16px;
    top : 50%;
    transform: translateY(-50%);
    font-weight: 700;
    cursor: pointer;
`

const SearchBar = styled.form<{showSearchBar : boolean}>`
  position: relative;
  left: 100px;
  width: ${props => props.showSearchBar ? "300px" : '76px'};
  height: 76px;
  background-color: white;
  box-shadow: 0 4px 24px hsla(222, 68%, 12%, .1);
  border: 1px solid lightgray;
  border-radius: 4rem;
  transition: width .5s cubic-bezier(.9, 0 ,.3, .9);

  ${mediaQuery[3]} {
    width: 600px;
  }
`
const SearchInput = styled.input<{showSearchBar : boolean}>`
    border: none;
    outline: none;
    width: calc(100% - 64px);
    height: 100%;
    border-radius: 4rem;
    padding-left: 14px;
    background-color: white;
    font-size: small;
    font-weight: 500;
    opacity: ${props => props.showSearchBar ? "1" : "0"};
    pointer-events:  ${props => props.showSearchBar ? "initial" : "none"};
    transition: opacity 0.5s;
`

const SearchButton = styled.div<{showSearchBar : boolean}>`
    width: 56px;
    height: 56px;
    background-color: dodgerblue;
    border-radius: 50%;
    position: absolute;
    top: 0;
    bottom : 0;
    right : 10px;
    margin: auto;
    display: grid;
    place-items: center;
    cursor : pointer;
    transition: trasform .6s cubic-bezier(.9, 0 ,.3, .9);

    & i {
      color: white;
      font-size: 1.5rem;
      position: absolute;
      transition: opacity .6s cubic-bezier(.9, 0 ,.3, .9);
      opacity: ${props => props.showSearchBar ? "0" : "1"};
    }
`

const SearchClose = styled.button<{showSearchBar : boolean}>`
    color: white;
    background-color: transparent;
    font-size: 1.5rem;
    position: absolute;
    opacity: ${props => props.showSearchBar ? "1" : "0"};
    transition: opacity .6s cubic-bezier(.9, 0 ,.3, .9);
`

const UserInfo = styled.div`
    position: absolute;
    top : 50%;
    transform: translateY(-50%);
    right: 16px;
    display: flex;
    align-items: center;
    column-gap: 10px;
`
const Welcome = styled.div`
  display: none;

  ${mediaQuery[3]} {
    display: block;
  }
`

export const UserMenu = styled.div`
  position: absolute;
  top: 100px;
  right: 16px;
  width: 300px;
  padding: 20px;
  z-index: 10;
  min-height: 500px;
  border-radius : 20px;
  background-color: rgba(33, 33, 33, 0.78);
  color : white;
`
