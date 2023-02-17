import React, { useState } from 'react'
import useServerRefresher from '@/src/hooks/useServerRefresher'
import axios from 'axios'
import { useMutation } from 'react-query'
import CreateBoardUI from './CreateBoard.presenter'

export default function CreateBoard({
    token
} : {
    token : string;
}) {
    const [contents, setContents] = useState<string>("")
    const [images, setImages] = useState<string[]>([]);
    const [count, setCount] = useState<number>(0);

    const { mutate : createBoard } = useMutation("createBoard", async (data : any) => {
        try {
          const responce = await axios.post("http://13.209.193.45:3000/api/v1/articles",
          JSON.stringify(data),
            {
              headers : {
                'Authorization' : `Bearer ${token}`,
                'Content-Type': 'application/json',
              }
            }
          );

          const result = await responce.data.data;
          console.log(result);
          return result;
        } catch (err) {
          throw err
        }
      }, {
        onSuccess : useServerRefresher(),
      }
    )
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
    />
  )
}
