import React, { SetStateAction, use, useEffect, useState } from 'react';
import { SERVER_URL } from '@/util/constant';
import { useRecoilState, useRecoilValue } from 'recoil';
import { tokenState } from '@/state/tokenState'
import { useQuery } from 'react-query';
import { isBusinessErrorGuard } from 'picktogram-server-apis/config/errors';
import { fetcher } from '@/util/queryClient';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router'

import * as Apis from "picktogram-server-apis/api/functional";
import styled from '@emotion/styled'
import useDate from '@/src/hooks/useDate';

import Modal from '@/src/components/commons/Modal'
import ProfileImage from '../profileImage';
import Carousel from '../carousel';
import Pagination from '../Pagination/Pagination.container';

type CommentData = {
    list : {
        xPosition : string;
        yPosition : string;
        id : number;
        writerId : number;
        writer : {
            profileImage : string;
            id : number;
            nickname : string;
        }
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
        writer : {
            profileImage : string;
            id : number;
            nickname : string;
        }
        contents : string;
    }[];
    page : number;
    totalPage : number;
    hasMore : boolean;
}

type ArticleModalProps = {
    articleId : number;
    showArticle : boolean;
    setShowArticle : React.Dispatch<SetStateAction<boolean>>
}

const ArticleModal : React.FC<ArticleModalProps> = ({
    articleId,
    setShowArticle,
    showArticle
}) => {
    const router = useRouter()
    const token = useRecoilValue(tokenState)
    const [images, setImages] = useState<string[]>([])
    const [count, setCount] = useState<number>(0)
    const [page, setPage] = useState<number>(1)

    const onClose = () => {
        setShowArticle(false)
    }

    const {data : boardDetail} = useQuery(['fetchBoardDetail', articleId, token], async () => {
        try {
            if(!token) return null
            const response = await Apis.api.v1.articles.getOneDetailArticle({
                host : SERVER_URL as string,
                headers : {
                    Authorization : token
                }
            },
                articleId
            )

            if(isBusinessErrorGuard(response)) {
                return null
            }

            return response.data

        } catch (error) {
            console.log(error)
        }
    })

    // have to convert Nestia SDK
    const {data : boardComment} = useQuery<CommentData, AxiosError, CommentSelectData>(['fetchCommentsDetail', articleId, page], () => fetcher({
        method : 'get',
        path : `/api/v1/articles/${articleId}/comments?limit=10&page=${page}`,
        headers : {
            Authorization : token
        }
    }),
    {
        staleTime : 5000,
        keepPreviousData : true,
        select : (data) => {
            return {
                list : data.list,
                page : data.page,
                totalPage : data.totalPage,
                hasMore : data.totalPage > page
            }
        }
    })

    useEffect(() => {
        if(!boardDetail?.images) return
        setImages(boardDetail?.images?.map((e) => e.url))
    }, [boardDetail?.images])

    const bodyContent = (
        <Container>
            <LeftSide>
                <Carousel
                    images={images}
                    setImages={setImages}
                    count={count}
                    setCount={setCount}
                />
            </LeftSide>
            <RightSide>
                <UserInfo>
                    <ProfileImage isCircle={true} profileImage={boardDetail?.writer.profileImage}/>
                    <div>
                        <div>
                            {boardDetail?.writer.nickname}
                        </div>
                    </div>
                </UserInfo>
                <Contents>
                    {boardDetail?.contents}
                </Contents>
                <CommentList>
                    {!boardDetail?.comments.length && (
                        <div>댓글이 없습니다.</div>
                    )}
                    {boardComment?.list?.map((comment) => (
                        <div style={{display : 'flex', columnGap : '1rem', alignItems : 'center'}}>
                            <ProfileImage
                                isCircle={true}
                                width={25}
                                height={25}
                                profileImage={comment.writer.profileImage}
                                onClick={() => router.push(`/user/profile/${comment.writer.id}`)}
                            />
                            <div>
                                {comment.writer.nickname}
                            </div>
                            <Comment>
                                {comment.contents}
                            </Comment>
                        </div>

                    ))}
                </CommentList>
                <Pagination
                    page={page}
                    setPage={setPage}
                    totalPage={boardComment?.totalPage}
                />
            </RightSide>
        </Container>
    )
    return (
       <Modal
            title='Article'
            isOpen={showArticle}
            onClose={onClose}
            label='ArticleModal'
            body={bodyContent}
       />
    );
};

export default ArticleModal;

const Container = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 2fr 1.5fr;
    min-height: 700px;
`

const LeftSide = styled.div`
    width: 100%;
    padding: 20px;
    display: flex;
    justify-content: center;
`

const RightSide = styled(LeftSide)`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    row-gap: 1rem;
`

const UserInfo = styled.div`
    display: flex;
    column-gap: 1rem;
`

const Contents = styled.div`
    min-height: 300px;
    padding-bottom: 20px;
    border-bottom: 1px solid lightgray;
`

const CommentList = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    justify-content: flex-start;
`

const Comment = styled.div`
    display: flex;
    column-gap: 1rem;
`