import React, { useEffect } from 'react'
import { infiniteFetcher } from "@/util/queryClient"
import { useInfiniteQuery } from "react-query"
import MainUI from './Main.presenter'
import { ResponceData } from "./Main.type"
import useScrollPos from "@/src/hooks/useScrollPos"
import ReactGA from 'react-ga'

import { useSetRecoilState } from 'recoil'
import { userState } from '@/state/userState'
import { UserFromRequest } from '@/src/auth/tokens'
import Header from '../commons/layout/header'

export default function Main({
    token,
    user
} : UserFromRequest
) {
      const setUserState = useSetRecoilState(userState)
      const { data, fetchNextPage }  = useInfiniteQuery<ResponceData>(['infiniteBoard'],
          ({pageParam = 1}) => infiniteFetcher({
            method : 'get',
            path : `/api/v1/articles?limit=10&page=`,
            headers : {
              Authorization : token
            },
            page : pageParam,
          }), {
           getNextPageParam : (lastPage) => {
              return lastPage.page == lastPage.totalPage ? undefined : Number(lastPage.page) + 1;
           },
         })

      const { loadPos } = useScrollPos();

      useEffect(() => {
        setUserState(user)

      }, [user])

      useEffect(() => {
        loadPos();
        ReactGA.pageview(window.location.pathname + window.location.search);
      }, [])

      const handleNextPage = () => {
          fetchNextPage();
      }

    return (
      <>
        <Header token={token}/>
        <MainUI
          user={user}
          token={token}
          data={data}
          handleNextPage={handleNextPage}
        />
      </>

    )
}
