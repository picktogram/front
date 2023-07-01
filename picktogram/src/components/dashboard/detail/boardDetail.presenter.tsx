import React, { useCallback, useEffect, useRef, useState } from 'react'
import { BoardDetailUIProps, ICommentSelectData } from './boardDetail.type'

import * as S from "./boardDetail.styles"

import Carousel from '@/src/components/commons/carousel';
import BoardModal from "@/src/components/commons/boardModal"
import Pagination from '@/src/components/commons/Pagination/Pagination.container';
import ProfileImage from '../../commons/profileImage';
import useImageRef from '@/src/hooks/useImageRef';
import InputRemoteControl from './components/inputRemoteControl';
import CommentModal from './components/commentModal';

export default function BoardDetailUI({
    boardData,
    handleMoveEdit,
    commentsData,
    setPage,
    page,
    handleComment
    } : BoardDetailUIProps
    ) {
    const currentId = useRef<number>(boardData?.images[0]?.id)
    const [count, setCount] = useState<number>(0)
    const [isShow, setIsShow] = useState<boolean>(false)
    const [hoverInfo, setHoverInfo] = useState<{id : string; isHover : boolean}>({
        id : '',
        isHover : false,
    })
    const [inputValue, setInputValue] = useState<string>('')

    const {ref, handlePosition, xPos, yPos, isOpen, handleClose, handleSubmit } = useImageRef()

    const [commentList, setCommentList] = useState<ICommentSelectData>({
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
            <S.ImageWrapper >
                {
                    boardData?.images.length > 0 && (
                        <S.ImagesBox onClick={handlePosition} >
                            <Carousel
                                images={boardData?.images}
                                count={count}
                                setCount={setCount}
                                currentId={currentId}
                            />
                           <InputRemoteControl
                                isOpen={isOpen}
                                xPos={xPos}
                                yPos={yPos}
                                handleComment={handleComment}
                                currentId={currentId.current}
                                handleClose={handleClose}
                           />
                          <CommentModal
                            commentsData={commentsData}
                            currentId={currentId.current}
                            hoverInfo={hoverInfo}
                          />
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
                <S.ContentsBox>
                    <S.Contents>{boardData?.contents}</S.Contents>
                    <S.CommentInput onSubmit={(e) => e.preventDefault()}>
                            <S.Input type='text' onChange={(e) => setInputValue(e.currentTarget.value)} value={inputValue}/>
                            <S.Button
                                onClick={() => handleComment({
                                    parentId : null,
                                    contents : inputValue,
                                    xPosition : xPos ? xPos : null,
                                    yPosition : yPos ? yPos : null,
                                    imageId : currentId.current,
                                    onSuccess: () => setInputValue(''),
                                })}
                                disabled={!inputValue}
                            >
                                등록
                            </S.Button>
                    </S.CommentInput>
                    <S.CommentsBox>
                        {
                            commentList.list.map((comment) => (
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
                                        {comment.contents}
                                </S.Comments>
                            ))
                        }
                        <Pagination totalPage={commentList.totalPage} setPage={setPage} page={page} />
                    </S.CommentsBox>
                </S.ContentsBox>
            </S.UserWrapper>
    </S.Container>
  )
}

