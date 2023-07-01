import React from 'react'
import { CreateBoardUIProps } from './CreateBoard.types'

import * as S from "./CreateBoard.styles"

import Dropzone from "@/src/components/commons/dropzone"
import Carousel from '@/src/components/commons/carousel'

export default function CreateBoardUI({
    token,
    images,
    setImages,
    count,
    setCount,
    setContents,
    currentUser,
    handleSubmit,
    handleEditSubmit,
    isEdit,
    defaultData,
    handelDelelte
} : CreateBoardUIProps
) {
  return (
    <S.Container>
      <h1 style={{marginBottom : "1rem"}}>게시글 {isEdit ? "수정" : "만들기"}</h1>

      <form onSubmit={ isEdit ? handleEditSubmit : handleSubmit}>
        <S.Wrapper>
          <S.UserProfile>
            <S.UserImage background={currentUser?.profileImage} />
            <S.Username>{currentUser?.nickname}</S.Username>
          </S.UserProfile>
          <S.Input
            onChange={(e) => {
              setContents(e.target.value);
            }}
            defaultValue={defaultData ? defaultData.contents : ""}
            placeholder={`${currentUser?.nickname}님, 무슨 생각을 하고 계신가요?`}
          />
          <S.ImageBox>
            <div>업로드한 이미지를 클릭하여 삭제할 수 있습니다.</div>
            {!isEdit && <Dropzone images={images} setImages={setImages} token={token} setCount={setCount} />}
            {isEdit && <div></div> }
            <div
              style={{
                display : 'flex',
                columnGap : '1rem',
                flexWrap : 'wrap'
              }}
            >
              {
                images.map((url) => (
                    <img
                      src={url}
                      style={{
                        width : '300px',
                        height : '300px',
                        objectFit : 'cover'
                      }}
                      onClick={() => handelDelelte(url)}
                    />
                ))
              }
            </div>
          </S.ImageBox>
          <S.Button type='submit'>{isEdit ? "수정" : "게시"}</S.Button>
        </S.Wrapper>
      </form>

    </S.Container>
  )
}
