import { userFromRequest } from '@/src/auth/tokens'
import useServerRefresher from '@/src/hooks/useServerRefresher'
import axios from 'axios'
import { GetServerSidePropsContext } from 'next/types'
import React, { useState } from 'react'
import { useMutation } from 'react-query'
import Dropzone from "@/components/dropzone"
import Carousel from '@/components/carousel'
import styled from '@emotion/styled'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  width: 1200px;
  margin: 0 auto;
  padding: 16px 20px;
  border: 1px solid black;
`
const Input = styled.textarea`
    position: relative;
    padding: 2rem;
    width: 100%;
    height: 500px;
    font-size: 15px;
    border: 0;
    border-radius: 15px;
    outline: none;
    padding-left: 10px;
    background-color: rgb(233, 233, 233);
    resize: none;

    &:focus {
      border: 1px solid gray
    }
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

const NewDashBoardPage = ({
    token,
  } : {
    token : string;
  }) => {
  const [contents, setContents] = useState<string>("")
  const [images, setImages] = useState<[]>([]);
  const [count, setCount] = useState<number>(0);

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

  return (
    <div>
      <h1 style={{marginBottom : "1rem"}}>게시판 작성</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        let data = {
          "contents" : contents,
          "images" : images // 수정 요망
        }
        creatBoard(data)
      }}>
        <Container>
          <Dropzone images={images} setImages={setImages} token={token} setCount={setCount} />
          <Carousel images={images} count={count} setCount={setCount} setImages={setImages} />
          <div>업로드한 이미지를 클릭하여 삭제할 수 있습니다.</div>
          <Input onChange={(e) => {
            setContents(e.target.value);
          }} />
        </Container>

        <button type='submit'>제출</button>
      </form>
    </div>
  )
}


export default NewDashBoardPage;