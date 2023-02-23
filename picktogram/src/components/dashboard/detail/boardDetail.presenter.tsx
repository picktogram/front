import React from 'react'
import { DetailResponce } from './boardDetail.type'
import * as S from "./boardDetail.styles"

export default function BoardDetailUI({
    data
    } : {
        data : DetailResponce | undefined
    }) {
  return (
    <S.Container>
        <S.ImagesBox>
        <div>
            {data?.images.map((image) => (
            <img key={image.id} src={image.url} />
            ))}
        </div>
        </S.ImagesBox>
        {/* contents wrapper */}

        <S.ContentsBox>
            {/* <input type='text' /> */}
            <S.UserInfo>
            <i className="ri-user-3-line"></i>
            <span>
                {data?.writer.nickname}
            </span>
            </S.UserInfo>
            <S.Contents>{data?.contents}</S.Contents>
            <S.CommentsBox>
            <S.Comments>
                댓글이 있어용
            </S.Comments>
            <S.CommentInput>
                <i className="ri-user-3-line"></i>
                <input type='text'/>
            </S.CommentInput>
            </S.CommentsBox>
        </S.ContentsBox>
    {/* comment wrapper */}

  </S.Container>
  )
}
