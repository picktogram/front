import { userFromRequest } from '@/src/auth/tokens';
import { GetServerSidePropsContext } from 'next';
import React from 'react'
import BoardDetail from '@/src/components/dashboard/detail/boardDetail.container';



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

export default function DashBoardDetailPage({ token } : { token : string }) {

  return (
    <BoardDetail token={token} />
  )
}
