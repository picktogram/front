import React, { MouseEventHandler, SetStateAction, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { tokenState, myIdState } from '@/state/tokenState'
import { useQuery } from 'react-query';
import { fetcher } from '@/util/queryClient';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router'

import styled from '@emotion/styled'

import Modal from '@/src/components/commons/Modal'
import ProfileImage from '../profileImage';
import Carousel from '../carousel';
import Pagination from '../Pagination/Pagination.container';
import useBoard from '@/src/hooks/useBoard';
import useAddComment from '@/src/hooks/useAddComment';

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
    const myId = useRecoilValue(myIdState)

    const [images, setImages] = useState<string[]>([])
    const [count, setCount] = useState<number>(0)
    const [page, setPage] = useState<number>(1)
    const [isMine, setIsMine] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>('')

    const { data : boardDetail, isFetched } = useBoard(token, articleId)

    // have to convert Nestia SDK
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

    const onAddComment : MouseEventHandler<HTMLButtonElement> = () => {
        let data = {
            parentId : null,
            contents : inputValue,
            xPosition : null, // 일단 고정
            yPosition : null, // 일단 고정
        }
        setInputValue("");
        addComment(data);
    }

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
                <CommentForm onSubmit={(e) => e.preventDefault()}>
                    <input type='text' onChange={(e) => setInputValue(e.currentTarget.value)} value={inputValue}/>
                    <button onClick={onAddComment} disabled={!inputValue} >
                        등록
                    </button>
                </CommentForm>
                <CommentList>
                    {!boardDetail?.comments.length && (
                        <div>댓글이 없습니다.</div>
                    )}
                    {boardComments?.list?.map((comment) => (
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
                    totalPage={boardComments?.totalPage}
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


const CommentForm = styled.form`
   width: 90%;
   margin: 0 auto;
   display: grid;
   column-gap: 1rem;
   grid-template-columns: 85% 15%;
   & input {
      border: none;
      background-color: gray;
      border-radius: 20px;
      height: 25px;
      padding: 1rem;
      color: white;
   }
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