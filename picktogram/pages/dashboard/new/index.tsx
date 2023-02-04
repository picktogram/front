import { userFromRequest } from '@/src/auth/tokens'
import { GetServerSidePropsContext } from 'next/types'
import React from 'react'

export const getServerSideProps = async (context : GetServerSidePropsContext) => {
    const { token } = await userFromRequest(context.req)

    if(!token) {
      return {
        redirect : {
          destination : '/login',
          permanent : false
        }
      }
    }

    return {
      props : {
        token,
      },
    }
}

const NewDashBoardPage = ({ token } : { token : string }) => {

  return (
    <div>
      <h1>게시판 작성</h1>
      <div>로그인 이후 접근 가능한 페이지입니다.</div>
    </div>
  )
}


export default NewDashBoardPage;