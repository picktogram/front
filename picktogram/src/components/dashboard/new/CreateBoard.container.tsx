import React, { FormEvent, useEffect, useState } from 'react'
import { useMutation , useQueryClient } from 'react-query'
import { SERVER_URL } from "@/util/constant"
import { CreateBoardProps } from './CreateBoard.types'
import { useRouter } from 'next/router'

import useCurrentUser from '@/src/hooks/useCurrentUser'
import axios from 'axios'

import CreateBoardUI from './CreateBoard.presenter'
import Header from '../../commons/layout/header'

export default function CreateBoard({
    token,
    isEdit,
    defaultData
} : CreateBoardProps
) {
    const [contents, setContents] = useState<string>("")
    const [images, setImages] = useState<string[]>([]);
    const [count, setCount] = useState<number>(0);
    const currentUser = useCurrentUser(token)
    const queryClient = useQueryClient();
    const router = useRouter()

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
    }, {
      onSuccess : () => {
        queryClient.invalidateQueries({ queryKey : ['infiniteBoard']})
      }
    })

    const handleSubmit = (e : FormEvent) => {
      e.preventDefault()
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
      router.push('/')
    }

    const handleEditSubmit = (e : FormEvent) => {
      e.preventDefault()

      let data = {
        "contents" : contents,
        'type' : "question" // 일단 고정
      }

      editBoard(data)
      router.push('/')
    }


  return (
    <>
      <Header token={token}/>
      <CreateBoardUI
          token={token}
          images={images}
          setImages={setImages}
          count={count}
          setCount={setCount}
          setContents={setContents}
          currentUser={currentUser}
          handleSubmit={handleSubmit}
          handleEditSubmit={handleEditSubmit}
          isEdit={isEdit}
          defaultData={defaultData}
      />
    </>

  )
}
