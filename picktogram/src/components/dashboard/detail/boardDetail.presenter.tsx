import React, { useState } from 'react'
import { DetailResponce } from './boardDetail.type'
import * as S from "./boardDetail.styles"
import Carousel from '@/src/components/commons/carousel';
import BoardModal from "@/src/components/commons/boardModal"
import { UseMutateFunction } from 'react-query';

export default function BoardDetailUI({
    data,
    handleMoveEdit,
    addComments
    } : {
        data : DetailResponce;
        handleMoveEdit : React.MouseEventHandler<HTMLButtonElement>
        addComments : UseMutateFunction<any, unknown, any, unknown>;
    }) {

    const [images, setImage] = useState<string[]>(data.images.map(e => e.url));
    const [count, setCount] = useState<number>(0);
    const [isShow, setIsShow] = useState<boolean>(false);

  return (
    <S.Container>
        <S.UserBox>
            <S.UserInfo>
                <i className="ri-user-3-line"></i>
                <span>
                    {data?.writer.nickname}
                </span>
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
            <Carousel images={images} setImages={setImage} count={count} setCount={setCount} isCreate={false}/>
        </S.ImagesBox>
        {/* contents wrapper */}

        <S.ContentsBox>
            <S.Contents>{data?.contents}</S.Contents>
            <S.CommentsBox>
                <S.Comments>
                    댓글이 있어용
                </S.Comments>
                <S.CommentInput onSubmit={(e) => e.preventDefault()}>
                    <S.UserInfo>
                        <i className="ri-user-3-line"></i>
                        <span>
                            {data?.writer.nickname}
                        </span>
                    </S.UserInfo>
                    <input type='text'/>
                    <button onClick={() => {
                        let data = {
                            parentId : 0,
                            contents : 'texttexttexttexttexttext',
                            xPosition : 0,
                            yPosition : 0,
                        }
                        addComments(data);
                    }}>
                        등록
                    </button>
                </S.CommentInput>
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