import React, { useCallback, useEffect, useRef, useState } from 'react'
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
    commentsData,
    setPage,
    page,
    handleComment
    } : BoardDetailUIProps
    ) {
    const currentId = useRef<number>(boardData?.images[0].id)
    const [count, setCount] = useState<number>(0);
    const [isShow, setIsShow] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');
    const [modalInputValue, setModalInputValue] = useState<string>('')

    const {ref, handlePosition, xPos, yPos, isOpen, handleClose, handleSubmit } = useImageRef()

    console.log(xPos, yPos)

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
                            {
                                isOpen && (
                                    <div
                                        ref={ref}
                                        style={{
                                            width : '200px',
                                            height : '200px',
                                            position: 'absolute',
                                            left: xPos,
                                            top: yPos,
                                            backgroundColor : 'black',
                                            zIndex : '2000'
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <input
                                            type="text"
                                            placeholder="댓글을 입력해주세요."
                                            value={modalInputValue}
                                            onChange={(e) => setModalInputValue(e.target.value)}
                                        />
                                        <button onClick={handleClose}>x</button>
                                        <button onClick={() => handleComment({
                                            parentId : null,
                                            contents : modalInputValue,
                                            xPosition : xPos ? xPos : null,
                                            yPosition : yPos ? yPos : null,
                                            imageId : currentId.current,
                                            onSuccess: () => {
                                                setModalInputValue('')
                                                handleClose()
                                            }
                                        })}
                                        disabled={!modalInputValue}
                                        >댓글 달기</button>
                                    </div>
                                )
                            }
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
                        { commentList.list.map((comment) => (
                            <S.Comments key={comment.id}>
                                    {comment.contents}
                            </S.Comments>
                        ))}
                        <Pagination totalPage={commentList.totalPage} setPage={setPage} page={page} />
                    </S.CommentsBox>
                </S.ContentsBox>
            </S.UserWrapper>
    </S.Container>
  )
}

