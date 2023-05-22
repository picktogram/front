import React from 'react'
import { userFromRequest } from '@/src/auth/tokens'
import { GetServerSidePropsContext } from 'next';
import {useRouter} from "next/router"

import useBoard from '@/src/hooks/useBoard';

import CreateBoard from '@/src/components/dashboard/new/CreateBoard.container'

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
  const {data : defaultBoardData, isLoading, isError} = useBoard(token, Number(router.query.id))

  if(isError) {
    return <div>Error...</div>
  }

  return (
    <CreateBoard token={token} isEdit={true} defaultData={defaultBoardData}/>
  )
}
