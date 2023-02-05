import { userFromRequest } from '@/src/auth/tokens';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router'
import React from 'react'
import { useQuery } from 'react-query';

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
    const router = useRouter();
    // console.log(router.query.id)
    const { data, isLoading } = useQuery("getDetail", async () => {
        try {
            const res = await axios.get(`http://13.209.193.45:3000/api/v1/articles/${router.query.id}`, {
            headers : {
                Authorization : `Bearer ${token}`
                }
            })

            return res.data
        } catch (err) {
            throw err
        }
    });

    if(isLoading) {
        return <div>Loading...</div>
    }

  return (
    <div>
        <h2>상세페이지</h2>
        <div>작성자 : {data.data.writer.nickname}</div>
    </div>
  )
}
