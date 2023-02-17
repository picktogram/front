import React from 'react'
import axios from 'axios'
import { useInfiniteQuery } from "react-query"
// import Header from '@/src/components/commons/header'
import MainUI from './Main.presenter'

export default function Main({
    token,
    user
} : {
    token : string;
    user : {
        nickname : string
    };
}) {

    const fetchBoards = async (token : string, page : number) => {
        try {
          const res = await axios.get(`http://13.209.193.45:3000/api/v1/articles?limit=10&page=${page}`, {
            headers : {
              Authorization : `Bearer ${token}`
            }
          })

          const data = await res.data.data
          return data
        } catch (err) {
          return err
        }
      }

     const { data, fetchNextPage, isLoading }  = useInfiniteQuery(['infiniteBoard'],
           ({pageParam = 1}) => fetchBoards(token, pageParam), {
            getNextPageParam : (lastPage : any) => {
               return lastPage.page == lastPage.totalPage ? undefined : Number(lastPage.page) + 1;
            }
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
