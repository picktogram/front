import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { UserData } from '@/src/auth/tokens'
import { useRouter } from 'next/router';
import { SERVER_URL } from '@/util/constant';
import { isBusinessErrorGuard } from 'picktogram-server-apis/config/errors';

import * as Apis from "picktogram-server-apis/api/functional";
import styled from '@emotion/styled'

import Pagination from '../../commons/Pagination/Pagination.container';
import NoDataIndicator from '../../commons/NoDataIndicator';

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
    const { data : noReply } = useQuery(['fetchNoReply', page], async () => {
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

             if(isBusinessErrorGuard(response)) {
                return;
            }

             return response.data
        } catch (error) {
            console.log(error)
        }
    }, {
        keepPreviousData : true,
    })

  return (
        <Container>
            <h2 style={{fontSize : '1.3rem'}}>
                방문하시고 댓글을 달아보세요!
            </h2>
            <NoDataIndicator
                data={noReply ? noReply : {count : 0}}
                title='추천 게시글이 없습니다.'
            />
            <NoReplys>
                {
                    noReply?.list.map((board) => (
                        <NoReply key={board.id} >
                            <ProfileImage background={board.writer.profileImage} />
                            <Name>
                                {board.writer.nickname}
                            </Name>
                            <Contents>
                                {board.contents.length > 10 ? board.contents.substring(0, 10) + '...' : board.contents }
                            </Contents>
                            <VisitButton onClick={() => router.push(`/dashboard/${board.id}`)}>
                                <i className="ri-arrow-right-line"></i>
                            </VisitButton>
                        </NoReply>
                    ))
                }
            </NoReplys>
            <Pagination totalPage={noReply?.totalPage} setPage={setPage} page={page} />
        </Container>
  )
}

const Container = styled.div`
    padding: 20px;
    width: 500px;
    height: auto;
    max-height: 1000px;
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

const NoReply = styled.div`
    display: flex;
    column-gap: 1rem;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
`

const Name = styled.div`
    width: 50px;
`
const Contents = styled.div`
    width: 100px;
`

const VisitButton = styled.button`
    width: 50px;
    padding: 10px;
    background-color: dodgerblue;
    border: 1px solid lightgray;
    border-radius: 20px;
    color : white;
    text-align: center;
`

const ProfileImage = styled.div<{
    background : string | null | undefined
}>`
    width: 50px;
    height: 50px;
    background-image: url(${(props) => props.background ? props.background : '/images/placeholder.png'});
    background-size: cover;
    background-repeat: no-repeat;
    border: 1px solid lightgray;
    border-radius: 50%;
`