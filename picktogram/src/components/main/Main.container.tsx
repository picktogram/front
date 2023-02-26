import React from 'react'
import { useInfiniteQuery } from "react-query"
// import Header from '@/src/components/commons/header'
import MainUI from './Main.presenter'
import { ResponceData } from "./Main.type"
import { infiniteFetcher } from "@/util/queryClient"

export default function Main({
    token,
    user
} : {
    token : string;
    user : {
        nickname : string
    };
}) {
      const { data, fetchNextPage, isLoading }  = useInfiniteQuery<ResponceData>(['infiniteBoard'],
          ({pageParam = 1}) => infiniteFetcher({
            method : 'get',
            path : `/api/v1/articles?limit=10&page=`,
            headers : {
              Authorization : `Bearer ${token}`
            },
            page : pageParam,
          }), {
           getNextPageParam : (lastPage) => {
              return lastPage.page == lastPage.totalPage ? null : Number(lastPage.page) + 1;
           },
         })

      if(isLoading) {
        return (
          <>
            {/* <Header user={user}/> */}
            <div>Loading...</div>
          </>
        )
      }


  return (
    <MainUI user={user} data={data} fetchNextPage={fetchNextPage}/>
  )
}
