import React from 'react'
import BoardDetailUI from './boardDetail.presenter'
import axios from 'axios';
import { useRouter } from 'next/router'
import { useQuery } from 'react-query';
import { SERVER_URL } from "@/util/constant"
import { DetailResponce } from './boardDetail.type';

export default function BoardDetail({
    token
} : {
    token : string
}) {

    const router = useRouter();
    // console.log(router.query.id)
    const { data, isLoading, isStale } = useQuery<DetailResponce>("getDetail", async () => {
        try {
            const res = await axios.get(`${SERVER_URL}/api/v1/articles/${router.query.id}`, {
            headers : {
                Authorization : `Bearer ${token}`
                }
            })

            return res.data.data
        } catch (err) {
            throw err
        }
    });

    if(isLoading) {
        return <div>Loading...</div>
    }

   console.log(isStale)
  return (
    <BoardDetailUI data={data} />
  )
}
