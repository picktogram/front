import { clearUser, userFromRequest } from "@/src/auth/tokens"
import axios from "axios"
import React from "react"
import { useQuery } from "react-query"
import { GetServerSidePropsContext } from 'next'
import { useRouter } from "next/router"

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
export default function UserProfilePage (props : { user : { nickname : string }, token : string }) {
    const router = useRouter()
    const fetchUserProfile = async (token : string) => {
        try {
          const res = await axios.get("http://13.209.193.45:3000/api/v1/users/profile", {
            headers : {
              Authorization : `${token}`
            }
          })

          const data = await res.data.data
          return data
        } catch (err) {
          console.log(err)
        }
      }

    const {data, isLoading, isError} = useQuery("fetchUsers", () => fetchUserProfile(props.token));

    const loggoutUser = () => {
        clearUser();
        router.push("/login")
    }

    if(isLoading) {
        return <div>Loading...</div>
    }

    if(isError) {
        return <div>Error...</div>
    }

    return (
        <div style={{margin : "20px"}}>
            <h2>유저 페이지</h2>
            {/* <div>{data.nickname}님 환영합니다.</div> */}
            <div>
                <button onClick={loggoutUser}>logout</button>
            </div>
        </div>
    )
}