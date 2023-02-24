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
    const { data, isLoading, isError } = useQuery<DetailResponce>("getDetail", async () => {
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

    const handleMoveEdit = () => {
        router.push(`/dashboard/${router.query.id}/edit`);
    }

    if(isLoading) {
        return <div>Loading...</div>
    }

    if(isError) {
        return <div>Error...</div>
    }


  return (
    <BoardDetailUI data={data} handleMoveEdit={handleMoveEdit} />
  )
}
