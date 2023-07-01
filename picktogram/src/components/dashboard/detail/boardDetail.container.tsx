import React, { useState } from 'react'
import { IBoardDetailProps, ICommentBodyData,  ICommentSubmitData} from './boardDetail.type';
import { useRouter } from 'next/router'
import { useMutation, useQueryClient, useInfiniteQuery} from 'react-query';
import { SERVER_URL } from "@/util/constant"

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
            queryClient.invalidateQueries(['fetchComments', router.query.id ])
        },
    });

    const {
            data : commentsData,
            fetchNextPage : fetchNextCommentsData,
            hasNextPage : ishasNextComments
        } = useInfiniteQuery(['fetchComments', router.query.id] , async ({pageParam = 1}) => {
        try {
            const res = await Apis.api.v1.articles.comments.readComments({
                host : SERVER_URL as string,
                headers : {
                    Authorization : token
                }
            },
                Number(router.query.id),
                {
                    limit : 7,
                    page : pageParam
                }
            )

            return res.data
        } catch (error) {
            console.log(error)
        }
    }, {
        getNextPageParam : (lastPage) => {
            return lastPage?.page == lastPage?.totalPage ? undefined : Number(lastPage?.page) + 1;
        },
    })

    const handleNextCommentData = () => {
        fetchNextCommentsData()
    }

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
            commentsData={commentsData}
            ishasNextComments={ishasNextComments}
            handleComment={handleComment}
            handleMoveEdit={handleMoveEdit}
            handleNextCommentData={handleNextCommentData}
        />
    </>

  )
}

