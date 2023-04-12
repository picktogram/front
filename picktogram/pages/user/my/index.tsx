import React from "react"

import My from "@/src/components/user/my/my.container"

import { userFromRequest } from "@/src/auth/tokens"
import { GetServerSidePropsContext } from 'next'

interface MyPageProps {
  user : {
    nickname : string;
  };
  token : string
}


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
export default function UserMyPage (props : MyPageProps) {

    return (
        <div>
          <div style={{
            width : '1600px',
            margin : '0 auto',
            border : '1px solid black',
            minHeight : '100vh',
            padding : '1rem',
            backgroundColor : 'white'
          }}>
            <My token={props.token}/>
          </div>
        </div>
    )
}