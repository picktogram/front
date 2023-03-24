import React, { Suspense, useEffect } from 'react'
import { infiniteFetcher } from "@/util/queryClient"
import { useInfiniteQuery } from "react-query"
import MainUI from './Main.presenter'
import Loader from "./main.loader"
import { ResponceData } from "./Main.type"
import useScrollPos from "@/src/hooks/useScrollPos"

export default function Main({
    token,
    user
} : {
    token : string;
    user : {
        nickname : string
    };
}) {
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
        loadPos();
      }, [])

      const handleNextPage = () => {
          fetchNextPage();
      }

    return (
      <Suspense fallback={<Loader />}>
        <MainUI
          user={{...user, token,}}
          data={data}
          handleNextPage={handleNextPage}
          />
      </Suspense>
    )
}
