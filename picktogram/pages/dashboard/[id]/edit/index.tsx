import React from 'react'
import CreateBoard from '@/src/components/dashboard/new/CreateBoard.container'
import { userFromRequest } from '@/src/auth/tokens'
import { GetServerSidePropsContext } from 'next';
import useFetchDetailData from "@/src/hooks/useFetchDetailData"
import {useRouter} from "next/router"
import {useSetRecoilState} from "recoil"
import {boardBeforeSave} from "@/state/boardBeforeSave"

export const getServerSideProps = async (context : GetServerSidePropsContext) => {
    const data = await userFromRequest(context.req)

    if(!data?.token) {
      return {
        redirect : {
          destination : '/login',
          permanent : false
        }
      }
    }

    return {
      props : {
        token : data.token
      },
    }
}

export default function BoardEditPage({
    token
} : {
    token : string
}) {
  const router = useRouter();
  const {data, isLoading, isError} = useFetchDetailData({
    queryKey : 'getDetail',
    id : router.query.id,
    token,
  });
  const setBoardData = useSetRecoilState(boardBeforeSave);

  if(isLoading) {
    return <div>Loading...</div>
  }

  if(data){
    let {contents, images} : {contents : string; images : {url : string}[]}= data;
    let newBoardData = {
      contents,
      images : images.map((img) => img.url),
    }
    setBoardData(newBoardData);
  }

  if(isError) {
    return <div>Error...</div>
  }

  return (
    <CreateBoard token={token} isEdit={true} />
  )
}
