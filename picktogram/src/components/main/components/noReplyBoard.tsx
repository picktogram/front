import React from 'react'

import {useRecoilValue} from 'recoil'
import {tokenState} from "@/state/tokenState"

import { useInfiniteQuery } from 'react-query'
import { infiniteFetcher } from '@/util/queryClient'

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


export default function NoReplyBoard() {
    const token = useRecoilValue(tokenState);

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

    // console.log(NoReplyBoardData)
  return (
    <div style={{
        width : "350px",
        height : "500px",
        border : "none",
        backgroundColor : "white"
    }}>NoReplyBoard</div>
  )
}
