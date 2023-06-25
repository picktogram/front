import React, { useCallback, useEffect, useState } from 'react'
import { BoardDetailUIProps } from './boardDetail.type'

import * as S from "./boardDetail.styles"

import Carousel from '@/src/components/commons/carousel';
import BoardModal from "@/src/components/commons/boardModal"
import Pagination from '@/src/components/commons/Pagination/Pagination.container';
import NewCommentsModal from './components/newCommentsModal';
import ProfileImage from '../../commons/profileImage';
import useImageRef from '@/src/hooks/useImageRef';

export default function BoardDetailUI({
    boardData,
    handleMoveEdit,
    addComments,
    commentsData,
    setPage,
    page,
    isNewComments,
    handleNewComments
    } : BoardDetailUIProps
    ) {

    const [images, setImage] = useState<string[]>(boardData.images.map((e : any) => e.url));
    const [count, setCount] = useState<number>(0);
    const [isShow, setIsShow] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');

    const {ref, handlePosition, xPos, yPos} = useImageRef()

    const handleClickImage = useCallback((e : React.MouseEvent<HTMLDivElement>) => {
        handlePosition(e)
        console.log('xPos', xPos)
        console.log('yPos', yPos)
    }, [handlePosition, xPos, yPos])

    // 런타임 에러 때문에
    const [commentList, setCommentList] = useState<{
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
    }>({
        list : [],
        page : 0,
        totalPage : 0,
        hasMore : false,
    });

    useEffect(() => {
        if(commentsData) {
            setCommentList(commentsData)
        }
    }, [commentsData])


  return (
    <S.Container>
        <S.ImageWrapper ref={ref} onClick={(e) => handleClickImage(e)}>
            {
                images.length > 0 && (
                    <S.ImagesBox>
                        <Carousel images={images} setImages={setImage} count={count} setCount={setCount} />
                    </S.ImagesBox>
                )
            }
        </S.ImageWrapper>
        <S.UserWrapper>
            <S.UserInfo>
                <ProfileImage
                    profileImage={boardData?.writer.profileImage}
                    isCircle={true}
                />
                <S.Username>
                    {boardData?.writer.nickname}
                </S.Username>
                <S.UserMenu onClick={() => setIsShow(!isShow)}>
                    <i className="ri-menu-line"></i>
                </S.UserMenu>
                {isShow && (
                    <S.BoardModalWrapper>
                        <BoardModal handleMoveEdit={handleMoveEdit} />
                    </S.BoardModalWrapper>
                )}
            </S.UserInfo>

            {/* <button onClick={handleMoveEdit}>수정하기</button> */}

            <S.ContentsBox>
                <S.Contents>{boardData?.contents}</S.Contents>
                {isNewComments && <NewCommentsModal handleNewComments={handleNewComments} />}
                <S.CommentInput onSubmit={(e) => e.preventDefault()}>
                        <S.Input type='text' onChange={(e) => setInputValue(e.currentTarget.value)} value={inputValue}/>
                        <S.Button onClick={() => {
                            let data = {
                                parentId : null,
                                contents : inputValue,
                                xPosition : null,
                                yPosition : null
                            }
                            setInputValue('');
                            addComments(data);
                        }}
                            disabled={!inputValue}
                        >
                            등록
                        </S.Button>
                </S.CommentInput>
                <S.CommentsBox>
                    { commentList.list.map((comment) => (
                        <S.Comments key={comment.id}>
                                {comment.contents}
                        </S.Comments>
                    ))}
                    <Pagination totalPage={commentList.totalPage} setPage={setPage} page={page} />
                </S.CommentsBox>
            </S.ContentsBox>
        </S.UserWrapper>
        {/* user wrapper */}





  </S.Container>
  )
}

