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
    const {data : NoReply} = useQuery(['getNoReply', page], async () => {
        try {
            const response = await Apis.api.v1.articles.no_reply.getAllWithNoReply({
                host : SERVER_URL as string,
                headers : {
                    Authorization : token,
                }
            }, {
                page,
                limit : 10
             })

             return response.data
        } catch (error) {
            console.log(error)
        }
    })

  return (
        <div style={{
            padding : '20px',
            width : '500px',
            minHeight : '500px',
            height : "500px",
            border : "1px solid lightgray",
            borderRadius : '20px',
            backgroundColor : "white"
        }}>
            <h2 style={{fontSize : '1.3rem'}}>
                방문하시고 댓글을 달아보세요!
            </h2>
            <div style={{height : '90%', marginTop : '1rem'}}>
                {
                    NoReply?.list.map((board) => (
                        <div key={board.id} style={{display : 'flex', columnGap : '1rem', justifyContent : 'space-between', alignItems : 'center' , marginBottom : '1rem'}}>
                            <ProfileImage background={board.writer.profileImage} />
                            <div>
                                {board.writer.nickname}
                            </div>
                            <div>
                                {board.contents.length > 10 ? board.contents.substring(0, 10) + '...' : board.contents }
                            </div>
                            <button onClick={() => router.push(`/dashboard/${board.id}`)}>방문하기</button>
                        </div>
                    ))
                }
            </div>
            <div>
                <Pagination totalPage={NoReply?.totalPage} setPage={setPage} page={page} />
            </div>
        </div>
  )
}


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