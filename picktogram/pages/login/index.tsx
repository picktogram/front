import React from 'react'
import { GetServerSidePropsContext } from 'next'
import { userFromRequest } from '@/src/auth/tokens'

import Login from '@/src/components/login/Login.container'


export const getServerSideProps = async (context : GetServerSidePropsContext) => {
    const data  = await userFromRequest(context.req)

    if(data?.user) {
        return {
            redirect : {
              destination : '/',
              permanent : false,
            },
        }
    }

    return {
        props : {}
    }
}

 function LoginPage() {

    return <Login />
}


export default LoginPage