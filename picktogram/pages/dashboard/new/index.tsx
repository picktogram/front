import { UserData, userFromRequest } from '@/src/auth/tokens'
import { GetServerSidePropsContext } from 'next/types'
import React from 'react'
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
        token : data.token,
        user : data.user
      },
    }
}

const CreateBoardPage = ({
    token,
    user,
  } : {
    token : string;
    user : UserData;
  }) => {


  return <CreateBoard token={token} />
}


export default CreateBoardPage;