import React, { useCallback, useEffect, useRef, useState } from 'react'
import { BoardDetailUIProps, ICommentSelectData } from './boardDetail.type'

import * as S from "./boardDetail.styles"

import BoardModal from "@/src/components/commons/boardModal"
import ProfileImage from '../../commons/profileImage';
import useImageRef from '@/src/hooks/useImageRef';

import ImageControlBox from './components/ImageControlBox';

export default function BoardDetailUI({
    boardData,
    handleMoveEdit,
    commentsData,
    ishasNextComments,
    handleComment,
    handleNextCommentData
    } : BoardDetailUIProps
    ) {
    const [count, setCount] = useState<number>(0)
    const [isShow, setIsShow] = useState<boolean>(false)
    const [hoverInfo, setHoverInfo] = useState<{id : string; isHover : boolean}>({
        id : '',
        isHover : false,
    })
    const [inputValue, setInputValue] = useState<string>('')
    const { handlePosition, xPos, yPos, isOpen, handleClose } = useImageRef()

    return (
            <S.Container>
               <ImageControlBox
                    commentsData={commentsData}
                    count={count}
                    setCount={setCount}
                    handleClose={handleClose}
                    handleComment={handleComment}
                    handlePosition={handlePosition}
                    hoverInfo={hoverInfo}
                    images={boardData?.images}
                    isOpen={isOpen}
                    xPos={xPos}
                    yPos={yPos}
               />
                <S.ContentsWrapper
                    isNoImage={boardData?.images?.length}
                >
                    <S.UserInfo>
                        <ProfileImage
                            profileImage={boardData?.writer.profileImage}
                            width={80}
                            height={80}
                            isCircle={true}
                        />
                        <S.UserNickname>
                            {boardData?.writer.nickname}
                        </S.UserNickname>
                        {/* <S.UserMenu onClick={() => setIsShow(!isShow)}>
                            <i className="ri-menu-line"></i>
                        </S.UserMenu> */}
                        {/* {isShow && (
                            <S.BoardModalWrapper>
                                <BoardModal handleMoveEdit={handleMoveEdit} />
                            </S.BoardModalWrapper>
                        )} */}
                    </S.UserInfo>
                    <S.ContentsBox>
                        <S.Contents>{boardData?.contents}</S.Contents>
                        <S.CommentInput
                            onSubmit={(e) => e.preventDefault()
                        }>
                                <S.Input
                                    type='text'
                                    onChange={(e) => setInputValue(e.currentTarget.value)}
                                    value={inputValue}
                                />
                                <S.Button
                                    onClick={() => handleComment({
                                        parentId : null,
                                        contents : inputValue,
                                        xPosition : xPos ? xPos : null,
                                        yPosition : yPos ? yPos : null,
                                        onSuccess: () => setInputValue(''),
                                    })}
                                    disabled={!inputValue}
                                >
                                    등록
                                </S.Button>
                        </S.CommentInput>
                        <S.CommentsBox>
                            {
                                commentsData?.pages.map((page, index) => (
                                    <React.Fragment key={index}>
                                        {
                                            page?.list.map((comment) => (
                                                <S.Comments
                                                    key={comment.id}
                                                    id={String(comment.id)}
                                                    onMouseOver={(e) => setHoverInfo({
                                                        id : e.currentTarget.id,
                                                        isHover : true,
                                                    })}
                                                    onMouseOut={() => setHoverInfo({
                                                        id : '',
                                                        isHover : false,
                                                    })}>
                                                        <ProfileImage
                                                            profileImage={comment.writer.profileImage}
                                                            isCircle
                                                        />
                                                        <S.Username>
                                                            {comment.writer.nickname}
                                                        </S.Username>
                                                        <div>
                                                            {comment.contents}
                                                        </div>
                                                </S.Comments>
                                            ))
                                        }
                                    </React.Fragment>
                                ))
                            }
                            <S.AddBtn
                                disabled={!ishasNextComments}
                                onClick={handleNextCommentData}
                            >
                                댓글 더보기
                            </S.AddBtn>
                        </S.CommentsBox>
                    </S.ContentsBox>
                </S.ContentsWrapper>
        </S.Container>
    )
}

