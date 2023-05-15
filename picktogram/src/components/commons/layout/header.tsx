import React, { useEffect, useState } from 'react'
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { tokenState } from '@/state/tokenState'
import { userState } from '@/state/userState'
import { userModalState } from '@/state/userModalState'
import { searchBarState } from '@/state/searchBarState';
import { useRouter } from "next/router"

import styled from '@emotion/styled'

import UserModal from '../modals/userModal';
import { mediaQuery } from '@/styles/media';
import useCurrentUser from '@/src/hooks/useCurrentUser';

export default function Header({token} : {token : string}) {
  const setShowModal = useSetRecoilState(userModalState)
  const [showSearchBar, setShowSearchBar] = useRecoilState(searchBarState)

  const router = useRouter()
  const user = useCurrentUser(token as string)

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
          <UserIcon onClick={() => setShowModal((prev) => !prev)} background={user?.profileImage}/>
          <Welcome>안녕하세요. {user?.nickname} 디자이너님 환영합니다!</Welcome>
        </UserInfo>
        <UserModal/>
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

const UserIcon = styled.div<{
  background : string | null | undefined
}>`
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid gray;
  background-image: url(${(props) => props.background ? props.background : 'images/placeholder.png'});
  background-repeat: no-repeat;
  background-size: cover;

  &:hover {
    &::after {
      position: absolute;
      content: '';
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: rgba(0,0,0,0.4);
    }
  }
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
