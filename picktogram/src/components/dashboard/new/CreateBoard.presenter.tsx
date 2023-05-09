import React from 'react'
import Dropzone from "@/src/components/commons/dropzone"
import Carousel from '@/src/components/commons/carousel'
import { UseMutateFunction } from 'react-query'
import * as S from "./CreateBoard.styles"
import { useRecoilState, useRecoilValue} from 'recoil'
import {boardContents, boardImages} from "@/state/boardBeforeSave"
import { UserType } from 'picktogram-server-apis/types'
import User from '../../user/user.container'

export default function CreateBoardUI({
    token,
    images,
    setImages,
    count,
    setCount,
    contents,
    setContents,
    currentUser,
    handleSubmit,
    handleEditSubmit,
    createBoard,
    isEdit
} : {
    token : string;
    images : string[];
    setImages : React.Dispatch<React.SetStateAction<string[]>>;
    count : number;
    setCount : React.Dispatch<React.SetStateAction<number>>;
    contents : string;
    setContents : React.Dispatch<React.SetStateAction<string>>;
    currentUser : UserType.DetailProfile | null
    handleSubmit : React.FormEventHandler<HTMLFormElement>;
    handleEditSubmit : React.FormEventHandler<HTMLFormElement>;
    createBoard :  UseMutateFunction<any, unknown, any, unknown>;
    isEdit? : boolean

}) {
  const [boardContentsData, setBoardContentsData] = useRecoilState(boardContents);
  const boardImageData = useRecoilValue(boardImages);
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
              setBoardContentsData(e.target.value);
            }}
            defaultValue={boardContentsData ? boardContentsData : ""}
            placeholder={`${currentUser?.nickname}님, 무슨 생각을 하고 계신가요?`}
          />
          <S.ImageBox>
            <div>업로드한 이미지를 클릭하여 삭제할 수 있습니다.</div>
            <Dropzone images={images} setImages={setImages} token={token} setCount={setCount} />
            {!isEdit && <Carousel images={images} count={count} setCount={setCount} setImages={setImages} />}
            {isEdit && <Carousel images={boardImageData?.length ? boardImageData : []} count={count} setCount={setCount} setImages={setImages} />}
          </S.ImageBox>
          <S.Button type='submit'>{isEdit ? "수정" : "게시"}</S.Button>
        </S.Wrapper>


      </form>
    </S.Container>
  )
}
