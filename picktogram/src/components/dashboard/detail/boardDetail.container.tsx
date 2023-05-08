import React, { Suspense, useEffect, useState } from 'react'
import BoardDetailUI from './boardDetail.presenter'
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router'
import { useMutation, useQueryClient, useQuery} from 'react-query';
import { SERVER_URL } from "@/util/constant"
import useFetchDetailData from '@/src/hooks/useFetchDetailData';
import Loader from "./boardDetail.loader"
import { fetcher } from '@/util/queryClient';

type CommentData = {
    list : {
        xPosition : string;
        yPosition : string;
        id : number;
        writerId : number;
        contents : string;
    }[];
    count : number;
    totalResult : number;
    totalPage : number;
    page : number
}

type CommentSelectData = {
    list : {
        xPosition : string;
        yPosition : string;
        id : number;
        writerId : number;
        contents : string;
    }[];
    page : number;
    totalPage : number;
    hasMore : boolean;
}

export default function BoardDetail({
    token,
    user
} : {
    token : string;
    user : {nickname : string};
}) {
    const [page, setPage] = useState<number>(1);
    const [isNewComments, setIsNewComments] = useState<boolean>(false);
    const router = useRouter();
    const queryClient = useQueryClient();
    const {data, isError} = useFetchDetailData({
        queryKey : "getDetail",
        id : router.query.id,
        token,
    })
    const { mutate : addComments } = useMutation("addComments", async (data : any) => {
        try {
            const res = await axios.post(`${SERVER_URL}/api/v1/articles/${router.query.id}/comments`,
                JSON.stringify(data),
                {
                headers : {
                    'Authorization' : token,
                    'Content-Type': 'application/json',
                }
            });
            return res;
        } catch (err) {
            throw err
        }
    }, {
        onSuccess: (data) => {
            console.log('onSuccess', data);
            setIsNewComments(true);
        },
    });

    const { data : commentsData } = useQuery<CommentData, AxiosError, CommentSelectData>(['getComments', page, router.query.id ], () => fetcher({
        method : 'get',
        path : `/api/v1/articles/${router.query.id}/comments?limit=10&page=${page}`,
        headers : {
            Authorization : token
        },
    }), {
        onSuccess : (data) => {
            console.log('success getCommets', data);
        },
        staleTime: 5000,
        keepPreviousData: true,
        select : (data) => {
            return {
                list: data.list,
                page : data.page,
                totalPage : data.totalPage,
                hasMore: data.totalPage > page
            };
        },
    })

    useEffect(() => {
        if (commentsData?.hasMore) {
            queryClient.prefetchQuery(['getComments', page + 1, router.query.id], () =>
                fetcher({
                    method : 'get',
                    path : `/api/v1/articles/${router.query.id}/comments?limit=10&page=${page + 1}`,
                    headers : {
                        Authorization : token
                    },
                })
            );
          }
    },[commentsData, page, queryClient])

    const handleMoveEdit = () => {
        router.push(`/dashboard/${router.query.id}/edit`);
    }

    const handleNewComments = () => {
        setIsNewComments(false);
        setPage(1);
        queryClient.invalidateQueries(['getComments', 1]);
    }

    if(isError) {
        return <div>Error...</div>
    }

  return (
        <BoardDetailUI
            data={data}
            handleMoveEdit={handleMoveEdit}
            addComments={addComments}
            user={user}
            commentsData={commentsData}
            setPage={setPage}
            page={page}
            isNewComments={isNewComments}
            handleNewComments={handleNewComments}
        />
  )
}

