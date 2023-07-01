import React, { MouseEventHandler, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { myIdState } from '@/state/tokenState'
import { useQuery, useQueryClient } from 'react-query';
import { fetcher } from '@/util/queryClient';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router'

import styled from '@emotion/styled'

import Modal from '@/src/components/commons/Modal'
import ProfileImage from '../profileImage';
import Carousel from '../carousel';
import useBoard from '@/src/hooks/useBoard';
import useAddComment from '@/src/hooks/useAddComment';
import Input from '../input';
import CommentList from '../list/CommentList';

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

export type CommentSelectData = {
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
    token : string;
}

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

const ArticleModal : React.FC<ArticleModalProps> = ({
    articleId,
    setShowArticle,
    showArticle,
    token
}) => {
    const router = useRouter()
    const myId = useRecoilValue(myIdState)
    const [images, setImages] = useState<string[]>([])
    const [count, setCount] = useState<number>(0)
    const [page, setPage] = useState<number>(1)
    const [isMine, setIsMine] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>('')
    const { data : boardDetail } = useBoard(token, articleId)

    //have to convert Nestia SDK
    const { data : boardComments , refetch : boardCommentsRefetch } = useQuery<CommentData, AxiosError, CommentSelectData>(['fetchCommentsDetail', articleId, page], () => fetcher({
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

    const {mutate : addComment} = useAddComment(token, articleId, () => boardCommentsRefetch())

    useEffect(() => {
        if(!boardDetail?.images) return
        setImages(boardDetail?.images?.map((e) => e.url))
    }, [boardDetail?.images])

    useEffect(() => {
        if(!myId || !boardDetail?.writer.id) return
        setIsMine(boardDetail?.writer.id === myId ? true : false)
    }, [myId, boardDetail?.writer.id])

    const onClose = () => {
        setShowArticle(false)
    }

    const onAddComment = useCallback(() => {
        let data = {
            parentId : null,
            contents : inputValue,
            xPosition : null,
            yPosition : null,
        }
        setInputValue('');
        addComment(data);
    }, [inputValue, setInputValue, addComment])

    const bodyContent = (
        <Container>
            <LeftSide>
                {/* <Carousel
                    images={images}
                    setImages={setImages}
                    count={count}
                    setCount={setCount}
                /> */}
            </LeftSide>
            <RightSide>
                <UserInfo>
                    <ProfileImage isCircle={true} profileImage={boardDetail?.writer.profileImage}/>
                    <div>
                        <div>
                            {boardDetail?.writer.nickname}
                        </div>
                        {
                            isMine  && (
                                <button onClick={() => router.push(`/dashboard/${articleId}/edit`)}>
                                    수정하기
                                </button>
                            )
                        }
                    </div>
                </UserInfo>
                <Contents>
                    {boardDetail?.contents}
                </Contents>
                <Input
                    onClick={onAddComment}
                    value={inputValue}
                    setValue={setInputValue}
                />
                <CommentList
                    commentsData={boardComments}
                    page={page}
                    setPage={setPage}
                    addComment={addComment}
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

