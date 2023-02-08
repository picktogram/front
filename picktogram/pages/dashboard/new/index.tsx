import { userFromRequest } from '@/src/auth/tokens'
import useServerRefresher from '@/src/hooks/useServerRefresher'
import axios from 'axios'
import { GetServerSidePropsContext } from 'next/types'
import React, { useState } from 'react'
import { useMutation } from 'react-query'
import Dropzone from "@/components/dropzone"
import styled from '@emotion/styled'

const Input = styled.input`
    display: block;
    margin: 0 auto;
    width: 1200px;
    height: 100vh;
    padding: 16px;
`

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

const NewDashBoardPage = ({ token } : { token : string }) => {
  const [contents, setContents] = useState<string>("")
  const [images, setImages] = useState<[]>([]);

  const { mutate : creatBoard } = useMutation("createBoard", async (data : any) => {
      try {
        const responce = await axios.post("http://13.209.193.45:3000/api/v1/articles",
        JSON.stringify(data),
          {
            headers : {
              'Authorization' : `Bearer ${token}`,
              'Content-Type': 'application/json',
            }
          }
        );

        const result = await responce.data.data;
        console.log(result);
        return result;
      } catch (err) {
        throw err
      }
    }, {
      onSuccess : useServerRefresher(),
    }
  )


  console.log(images)
  return (
    <div>
      <h1>게시판 작성</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        let data = {
          "contents" : contents,
        }
        creatBoard(data)
      }}>
        <Dropzone setImage={setImages} token={token} />

        <Input type="text" onChange={(e) => {
          setContents(e.target.value);
        }}/>
        <button type='submit'>제출</button>
      </form>
    </div>
  )
}


export default NewDashBoardPage;