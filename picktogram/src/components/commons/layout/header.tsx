import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { myIdState, tokenState } from '@/state/tokenState'
import { userModalState } from '@/state/userModalState'
import { searchBarState } from '@/state/searchBarState';
import { useRouter } from "next/router"
import { useQuery } from 'react-query';
import { fetcher } from '@/util/queryClient';

import styled from '@emotion/styled'

import UserModal from '../modals/userModal';

export default function Header() {
  const router = useRouter()
  const setShowModal = useSetRecoilState(userModalState)
  const [showSearchBar, setShowSearchBar] = useRecoilState(searchBarState)

  const token = useRecoilValue(tokenState)
  const myId = useRecoilValue(myIdState)
  const [myNickname, setMyNickname] = useState<string | null>(null)

  const { data : currentUser} = useQuery(['getUser', myId], () => fetcher({
        method : 'get',
        headers : {
            Authorization : token
        },
        path : `/api/v1/users/${myId}`
    }), {
        enabled : !!myId && !!token
    })
    useEffect(() => {
      if(currentUser) {
        setMyNickname(currentUser.nickname)
      }
    }, [currentUser])

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
          <UserIcon onClick={() => setShowModal((prev) => !prev)}>
            <i className="ri-user-3-line"></i>
          </UserIcon>
          <div>안녕하세요. {myNickname} 디자이너님 환영합니다!</div>
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
  border-radius: 4rem;
  transition: width .5s cubic-bezier(.9, 0 ,.3, .9);
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
    background-color: black;
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

const UserIcon = styled.div`
  border-radius: 50%;
  padding: 5px;
  border: 1px solid gray;
  font-size: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  & i {
    color : gray
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
