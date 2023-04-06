import React, { FormEvent, useEffect, useState } from 'react'
import useServerRefresher from '@/src/hooks/useServerRefresher'
import axios from 'axios'
import { useMutation , useQueryClient } from 'react-query'
import CreateBoardUI from './CreateBoard.presenter'
import { SERVER_URL } from "@/util/constant"
import { useRecoilState } from "recoil"
import { boardBeforeSave } from "@/state/boardBeforeSave"
import { useRouter } from 'next/router'

export default function CreateBoard({
    token,
    isEdit,
} : {
    token : string;
    isEdit? : boolean;
}) {
    const [contents, setContents] = useState<string>("")
    const [images, setImages] = useState<string[]>([]);
    const [count, setCount] = useState<number>(0);
    const queryClient = useQueryClient();
    const [boardRocilData, setBoardRecoilData]= useRecoilState(boardBeforeSave);
    const router =useRouter()

    const { mutate : createBoard } = useMutation("createBoard", async (data : any) => {
        try {
          const responce = await axios.post(`${SERVER_URL}/api/v1/articles`,
          JSON.stringify(data),
            {
              headers : {
                'Authorization' : token,
                'Content-Type': 'application/json',
              }
            }
          );

          const result = await responce.data.data;
          return result;
        } catch (err) {
          throw err
        }
      }, {
        onSuccess : () => {
          queryClient.invalidateQueries({ queryKey : ['infiniteBoard']})
          setBoardRecoilData({contents : "", images : [],})
        }
      }
    )

    const {mutate : editBoard} = useMutation("editBoard", async (data : any) => {
      try {
        const response = await axios.put(`${SERVER_URL}/api/v1/articles/${router.query.id}`,
          JSON.stringify(data),
          {
            headers : {
              'Authorization' : token,
              'Content-Type' : 'application/json'
          }
        })

      } catch (err) {
        throw err
      }
    })

    const handleSubmit = (e : FormEvent) => {
      e.preventDefault();
      let reqImages = images.map((image, index) => {
        return {
          url : image,
          position : String(index),
        }
      })

      let data = {
        "contents" : contents,
        "images" : reqImages,
        'type' : "question" // 일단 고정
      }
      createBoard(data)
    }

    const handleEditSubmit = (e : FormEvent) => {
      e.preventDefault();

      // let reqImages = images.map((image, index) => {
      //   return {
      //     url : image,
      //     position : String(index),
      //   }
      // })
      let data = {
        "contents" : contents,
        // "images" : reqImages,
        'type' : "question" // 일단 고정
      }

      editBoard(data);
    }


  return (
    <CreateBoardUI
        token={token}
        images={images}
        setImages={setImages}
        count={count}
        setCount={setCount}
        contents={contents}
        setContents={setContents}
        createBoard={createBoard}
        handleSubmit={handleSubmit}
        handleEditSubmit={handleEditSubmit}
        isEdit={isEdit}
    />
  )
}
