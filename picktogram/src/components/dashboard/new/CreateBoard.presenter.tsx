import React from 'react'
import Dropzone from "@/src/components/commons/dropzone"
import Carousel from '@/src/components/commons/carousel'
import { UseMutateFunction } from 'react-query'
import * as S from "./CreateBoard.styles"

export default function CreateBoardUI({
    token,
    images,
    setImages,
    count,
    setCount,
    contents,
    setContents,
    createBoard,
} : {
    token : string;
    images : string[];
    setImages : React.Dispatch<React.SetStateAction<string[]>>;
    count : number;
    setCount : React.Dispatch<React.SetStateAction<number>>;
    contents : string;
    setContents : React.Dispatch<React.SetStateAction<string>>;
    createBoard :  UseMutateFunction<any, unknown, any, unknown>;

}) {
  return (
    <div>
      <h1 style={{marginBottom : "1rem"}}>게시판 작성</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        let reqImages = images.map((image, index) => {
          return {
            url : image,
            position : index,
          }
        })

        let data = {
          "contents" : contents,
          "images" : reqImages,
        }

        createBoard(data)
      }}>
        <S.Container>
          <Dropzone images={images} setImages={setImages} token={token} setCount={setCount} />
          <Carousel images={images} count={count} setCount={setCount} setImages={setImages} />
          <div>업로드한 이미지를 클릭하여 삭제할 수 있습니다.</div>
          <S.Input onChange={(e) => {
            setContents(e.target.value);
          }} />
        </S.Container>

        <button type='submit'>제출</button>
      </form>
    </div>
  )
}
