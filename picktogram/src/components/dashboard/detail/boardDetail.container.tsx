import React, { Suspense, use } from 'react'
import BoardDetailUI from './boardDetail.presenter'
import axios from 'axios';
import { useRouter } from 'next/router'
import { useMutation } from 'react-query';
import { SERVER_URL } from "@/util/constant"
import useFetchDetailData from '@/src/hooks/useFetchDetailData';
import Loader from "./boardDetail.loader"

export default function BoardDetail({
    token
} : {
    token : string
}) {
    const router = useRouter();
    const {data, isError} = useFetchDetailData({
        queryKey : "getDetail",
        id : router.query.id,
        token,
    })

    const { mutate : addComments } = useMutation("addComments", async (data : any) => {
        try {
            const res = await axios.post(`${SERVER_URL}/api/v1/articles/${router.query.id}/comments`,
                JSON.stringify(data),
                {
                headers : {
                    'Authorization' : token,
                    'Content-Type': 'application/json',
                }
            });
            console.log(res)
            return res;
        } catch (err) {
            console.log(err);
            throw err
        }
    }, {
        onSuccess: (data) => {
            console.log('onSuccess', data);
        },
    });

    const handleMoveEdit = () => {
        router.push(`/dashboard/${router.query.id}/edit`);
    }


    if(isError) {
        return <div>Error...</div>
    }


  return (

    <Suspense fallback={<Loader />}>
        <BoardDetailUI data={data} handleMoveEdit={handleMoveEdit} addComments={addComments}/>
    </Suspense>
  )
}
