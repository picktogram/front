import React, { useEffect } from 'react'
import Dropzone from "@/src/components/commons/dropzone"
import Carousel from '@/src/components/commons/carousel'
import { UseMutateFunction } from 'react-query'
import * as S from "./CreateBoard.styles"
import {useSetRecoilState} from 'recoil'
import {boardContents} from "@/state/boardBeforeSave"

export default function CreateBoardUI({
    token,
    images,
    setImages,
    count,
    setCount,
    contents,
    setContents,
    handleSubmit,
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
    handleSubmit : React.FormEventHandler<HTMLFormElement>;
    createBoard :  UseMutateFunction<any, unknown, any, unknown>;
    isEdit : boolean

}) {
  const setBoardContentsData = useSetRecoilState(boardContents)
  return (
    <div>
      <h1 style={{marginBottom : "1rem"}}>게시판 {isEdit ? "수정" : "작성"}</h1>
      <form onSubmit={handleSubmit}>
        <S.Container>
          <Dropzone images={images} setImages={setImages} token={token} setCount={setCount} />
          <Carousel images={images} count={count} setCount={setCount} setImages={setImages} isCreate={true} />
          <div>업로드한 이미지를 클릭하여 삭제할 수 있습니다.</div>
          <S.Input
            onChange={(e) => {
              setContents(e.target.value);
              setBoardContentsData(e.target.value);
            }}
          />
        </S.Container>

        <button type='submit'>{isEdit ? "수정" : "작성"}</button>
      </form>
    </div>
  )
}
