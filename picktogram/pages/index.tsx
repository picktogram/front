import React from "react"
import { GetServerSidePropsContext } from 'next'
import { userFromRequest } from '@/src/auth/tokens'
import Main from "@/src/components/main/Main.container"

export const getServerSideProps = async (context : GetServerSidePropsContext) => {
  const data = await userFromRequest(context.req);

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
          user : data.user,
          token : data.token,
      }
    }
}

export default function MainPage( props : { user : {nickname : string}, token : string }) {


  return <Main token={props.token} user={props.user} />

}
