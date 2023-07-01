import React, { useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios';
import { IBoardDetailProps, ICommentBodyData, ICommentData, ICommentSelectData, ICommentSubmitData} from './boardDetail.type';
import { useRouter } from 'next/router'
import { useMutation, useQueryClient, useQuery} from 'react-query';
import { SERVER_URL } from "@/util/constant"
import { fetcher } from '@/util/queryClient';

import * as Apis from "picktogram-server-apis/api/functional";
import useBoard from '@/src/hooks/useBoard';

import Header from '../../commons/layout/header';
import BoardDetailUI from './boardDetail.presenter'

export default function BoardDetail({
    token,
    user
} : IBoardDetailProps
) {
    const router = useRouter()
    const queryClient = useQueryClient()
    const {data, isError} = useBoard(token, Number(router.query.id))
    const [page, setPage] = useState<number>(1)

    const { mutate : addComments } = useMutation(['addComment', router.query.id], async (data : ICommentBodyData) => {
        try {
            const res = await Apis.api.v1.articles.comments.writeComment({
                host : SERVER_URL as string,
                headers : {
                    Authorization : token
                }},
                Number(router.query.id),
                {
                    contents : data?.contents,
                    parentId : data?.parentId,
                    xPosition : data?.xPosition,
                    yPosition : data?.yPosition,
                    imageId : data?.imageId,
                }
            )
            return res
        } catch (err) {
            throw err
        }
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries(['getComments', page, router.query.id ])
        },
    });

    const { data : commentsData } = useQuery<ICommentData, AxiosError, ICommentSelectData>(['getComments', page, router.query.id ], () => fetcher({
        method : 'get',
        path : `/api/v1/articles/${router.query.id}/comments?limit=4&page=${page}`,
        headers : {
            Authorization : token
        },
    }), {
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

    const handleComment = ({
        parentId,
        contents,
        xPosition,
        yPosition,
        imageId,
        onSuccess
    } : ICommentSubmitData
    ) => {
        let data = {
            parentId,
            contents,
            xPosition,
            yPosition,
            imageId,
        }
        try {
            void addComments(data)
            onSuccess?.()
        } catch (error) {
            console.log(error)
        }

    }


    if(isError) {
        return <div>Error...</div>
    }

  return (
    <>
        <Header
            token={token}
        />
        <BoardDetailUI
            boardData={data}
            handleMoveEdit={handleMoveEdit}
            commentsData={commentsData}
            setPage={setPage}
            page={page}
            handleComment={handleComment}
        />
    </>

  )
}

