import React, { useEffect, useState } from 'react'
import { DetailResponce } from './boardDetail.type'
import * as S from "./boardDetail.styles"
import Carousel from '@/src/components/commons/carousel';
import BoardModal from "@/src/components/commons/boardModal"
import { InfiniteData, UseMutateFunction } from 'react-query';
import Pagination from '@/src/components/commons/Pagination/Pagination.container';
import NewCommentsModal from './components/newCommentsModal';


export default function BoardDetailUI({
    data,
    handleMoveEdit,
    addComments,
    user,
    commentsData,
    setPage,
    page,
    isNewComments,
    handleNewComments
    } : {
        data : DetailResponce;
        handleMoveEdit : React.MouseEventHandler<HTMLButtonElement>
        addComments : UseMutateFunction<any, unknown, any, unknown>;
        user : {nickname : string};
        commentsData :  {
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
        } | undefined;
        setPage :  React.Dispatch<React.SetStateAction<number>>;
        page : number
        isNewComments : boolean;
        handleNewComments : any;
    }) {

    const [images, setImage] = useState<string[]>(data.images.map(e => e.url));
    const [count, setCount] = useState<number>(0);
    const [isShow, setIsShow] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');

    const isServer = typeof window === undefined;

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
        <S.UserBox>
            <S.UserInfo>
                <S.ProfileImage background={data?.writer.profileImage}/>
                <S.Username>
                    {data?.writer.nickname}
                </S.Username>
            </S.UserInfo>
            <S.UserMenu onClick={() => setIsShow(!isShow)}>
                <i className="ri-menu-line"></i>
            </S.UserMenu>
            {isShow && (
                <S.BoardModalWrapper>
                    <BoardModal handleMoveEdit={handleMoveEdit} />
                </S.BoardModalWrapper>
            )}
            {/* <button onClick={handleMoveEdit}>수정하기</button> */}
        </S.UserBox>
        {/* user wrapper */}

        <S.ImagesBox>
            <Carousel images={images} setImages={setImage} count={count} setCount={setCount} />
        </S.ImagesBox>
        {/* contents wrapper */}

        <S.ContentsBox>
            <S.Contents>{data?.contents}</S.Contents>
            {isNewComments && <NewCommentsModal handleNewComments={handleNewComments} />}
            <S.CommentInput onSubmit={(e) => e.preventDefault()}>
                    <S.UserInfo>
                        <i className="ri-user-3-line"></i>
                        <span>
                            {user.nickname}
                        </span>
                    </S.UserInfo>
                    <input type='text' onChange={(e) => setInputValue(e.currentTarget.value)} value={inputValue}/>
                    <button onClick={() => {
                        let data = {
                            parentId : null,
                            contents : inputValue,
                            xPosition : '0', // 일단 고정
                            yPosition : '0', // 일단 고정
                        }
                        setInputValue("");
                        addComments(data);
                    }}
                        disabled={!inputValue}
                    >
                        등록
                    </button>
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
    {/* comment wrapper */}


  </S.Container>
  )
}


// "parentId": 0,
//   "contents": "string",
//   "xPosition": 0,
//   "yPosition": 0