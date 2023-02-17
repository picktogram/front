import { userFromRequest } from '@/src/auth/tokens';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router'
import React, { FormEvent } from 'react'
import { useQuery } from 'react-query';
import styled from '@emotion/styled'

const Container = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 70% 30%;
    height: 100vh;
`

const ImagesBox = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  background-color: black;
`

const ContentsBox = styled.div`
  padding: 1rem;
  border: 1px solid black;
  background-color: #3f3f3f;
  color : white;
`

const UserInfo = styled.div`
  width: 100%;
  display: flex;
  column-gap: .5rem;
  border-top: 1px solid gray;
  padding: 0.5rem 0;
  margin-bottom: 1.5rem;
`

const Contents = styled.div`
  margin-bottom: 1.5rem;
`

const CommentsBox = styled.div`
   width: 100%;
   border-top: 1px solid gray;
   padding: 1rem;


`
const Comments = styled.div`
  width: 100%;
  margin-bottom: 1.5rem;
`

const CommentInput = styled.form`
   width: 100%;
   display: grid;
   column-gap: 1rem;
   grid-template-columns: 10% 90%;

   & input {
      border: none;
      background-color: gray;
      border-radius: 20px;
      height: 25px;
      padding: 1rem;
      color: white;
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

type ImageData = {
  id : number;
  depth : 1;
  position : number;
  url : string;
}

type DetailResponce = {
    id: number;
    contents: string;
    images: ImageData[];
    writer : {
       id : number,
       nickname : string ,
       profileImage : string
      };
}

const handleComments = (e : FormEvent) => {
  e.preventDefault();
}
export default function DashBoardDetailPage({ token } : { token : string }) {
    const router = useRouter();
    // console.log(router.query.id)
    const { data, isLoading } = useQuery<DetailResponce>("getDetail", async () => {
        try {
            const res = await axios.get(`http://13.209.193.45:3000/api/v1/articles/${router.query.id}`, {
            headers : {
                Authorization : `Bearer ${token}`
                }
            })

            return res.data.data
        } catch (err) {
            throw err
        }
    });

    if(isLoading) {
        return <div>Loading...</div>
    }

  return (
    <Container>
      <ImagesBox>


        <div>
          {data?.images.map((image) => (
            <img key={image.id} src={image.url} />
          ))}
        </div>
      </ImagesBox>
      {/* contents wrapper */}

      <ContentsBox>
          {/* <input type='text' /> */}
          <UserInfo>
            <i className="ri-user-3-line"></i>
            <span>
              {data?.writer.nickname}
            </span>
          </UserInfo>
          <Contents>{data?.contents}</Contents>
          <CommentsBox>
            <Comments>
              댓글이 있어용
            </Comments>
            <CommentInput>
              <i className="ri-user-3-line"></i>
              <input type='text' onSubmit={handleComments}/>
            </CommentInput>
          </CommentsBox>
      </ContentsBox>
      {/* comment wrapper */}

    </Container>
  )
}
