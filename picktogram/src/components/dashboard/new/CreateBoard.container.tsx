import React, { useState } from 'react'
import useServerRefresher from '@/src/hooks/useServerRefresher'
import axios from 'axios'
import { useMutation , useQueryClient } from 'react-query'
import CreateBoardUI from './CreateBoard.presenter'
import { SERVER_URL } from "@/util/constant"

export default function CreateBoard({
    token
} : {
    token : string;
}) {
    const [contents, setContents] = useState<string>("")
    const [images, setImages] = useState<string[]>([]);
    const [count, setCount] = useState<number>(0);
    const queryClient = useQueryClient();

    const { mutate : createBoard } = useMutation("createBoard", async (data : any) => {
        try {
          const responce = await axios.post(`${SERVER_URL}/api/v1/articles`,
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
        // onSuccess : useServerRefresher(),
        onSuccess : () => {
          queryClient.invalidateQueries({ queryKey : ['infiniteBoard']})
        }
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
