import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { UserData } from '@/src/auth/tokens'
import { useRouter } from 'next/router';
import { SERVER_URL } from '@/util/constant';

import * as Apis from "picktogram-server-apis/api/functional";
import styled from '@emotion/styled'

import Pagination from '../../commons/Pagination/Pagination.container';

type NoReplyProps = {
    user : UserData;
    token : string;
}

export default function NoReplyBoard({
    user,
    token
} : NoReplyProps) {
    const [page, setPage] = useState<number>(1)
    const router = useRouter()
    const { data : NoReply } = useQuery(['getNoReply', page], async () => {
        try {
            const response = await Apis.api.v1.articles.no_reply.getAllWithNoReply({
                host : SERVER_URL as string,
                headers : {
                    Authorization : token,
                }
            }, {
                page : page,
                limit : 6
             })

             return response.data
        } catch (error) {
            console.log(error)
        }
    })

  return (
        <Container>
            <h2 style={{fontSize : '1.3rem'}}>
                방문하시고 댓글을 달아보세요!
            </h2>
            <NoReplys>
                {
                    NoReply?.list.map((board) => (
                        <div key={board.id} style={{display : 'flex', columnGap : '1rem', justifyContent : 'space-between', alignItems : 'center' , marginBottom : '1rem'}}>
                            <ProfileImage background={board.writer.profileImage} />
                            <Name>
                                {board.writer.nickname}
                            </Name>
                            <Contents>
                                {board.contents.length > 10 ? board.contents.substring(0, 10) + '...' : board.contents }
                            </Contents>
                            <button onClick={() => router.push(`/dashboard/${board.id}`)}>방문하기</button>
                        </div>
                    ))
                }
            </NoReplys>
            <Pagination totalPage={NoReply?.totalPage} setPage={setPage} page={page} />
        </Container>
  )
}

const Container = styled.div`
    padding: 20px;
    width: 500px;
    height: 800px;
    border: 1px solid lightgray;
    border-radius: 20px;
    background-color: white;
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
`
const NoReplys = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  height: 85%;
`

const Name = styled.div`
    width: 50px;
`
const Contents = styled.div`
    width: 100px;
`

const ProfileImage = styled.div<{
    background : string | null | undefined
}>`
    width: 50px;
    height: 50px;
    background-image: url(${(props) => props.background ? props.background : 'images/placeholder.png'});
    background-size: cover;
    background-repeat: no-repeat;
    border: 1px solid lightgray;
    border-radius: 50%;
`