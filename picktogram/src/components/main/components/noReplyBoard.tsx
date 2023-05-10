import React, { useEffect, useState } from 'react'
import { useInfiniteQuery, useQuery } from 'react-query'
import { infiniteFetcher } from '@/util/queryClient'
import { UserData } from '@/src/auth/tokens'

import * as Apis from "picktogram-server-apis/api/functional";
import { SERVER_URL } from '@/util/constant';

type NoReplyProps = {
    user : UserData;
    token : string;
}

type NoRelpyBoardList = {
    profileImage : string;
    id : number;
    contents : string;
    createdAt : string;
    isMine : boolean;
    writerId : number;
    nickName : string;
    commentMetadata : [];
    followStatus : string;
}

type NoReplyBoardResponse = {
    list : NoRelpyBoardList[];
    count : number;
    totalResult : number;
    totalPage : number;
    page: number;
}


export default function NoReplyBoard({
    user,
    token
} : NoReplyProps) {
    const [page, setPage] = useState<number>(1)
    // Nestia 적용 x
    const {data : NoReplyBoardData} = useInfiniteQuery<NoReplyBoardResponse>(['getNoReplyBoard'], ({pageParam = 1}) => infiniteFetcher({
        method : 'get',
        path : `/api/v1/articles/no-reply?limit=100&page=`,
        headers : {
            Authorization : token,
        },
        page : pageParam,
    }), {
        onSuccess : () => {
            console.log('success getNoReplyBoard');
        }
    })
    // Nestia 적용 o
    const {data : NoReply} = useQuery(['getNoReply', page], async () => {
        try {
            const response = await Apis.api.v1.articles.no_reply.getAllWithNoReply({
                host : SERVER_URL as string,
                headers : {
                    Authorization : token,
                }
            }, {
                page,
                limit : 5
             })

             return response.data
        } catch (error) {
            console.log(error)
        }
    })

    console.log('NoReply', NoReply)
  return (
        <div style={{
            width : "350px",
            height : "500px",
            border : "none",
            backgroundColor : "white"
        }}>
        NoReplyBoard
        </div>
  )
}
