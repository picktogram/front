import React from 'react'
import BoardDetailUI from './boardDetail.presenter'
import axios from 'axios';
import { useRouter } from 'next/router'
import { useQuery, useMutation } from 'react-query';
import { SERVER_URL } from "@/util/constant"
import { DetailResponce } from './boardDetail.type';

export default function BoardDetail({
    token
} : {
    token : string
}) {
    const router = useRouter();
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
    const { mutate : addComments } = useMutation("addComments", async (data : any) => {
        try {
            const res = await axios.post(`${SERVER_URL}/api/v1/articles/${router.query.id}/comments`,
                JSON.stringify(data),
                {
                headers : {
                    'Authorization' : `Bearer ${token}`,
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

    if(isLoading || !data) {
        return <div>Loading...</div>
    }

    if(isError) {
        return <div>Error...</div>
    }


  return (
    <BoardDetailUI data={data} handleMoveEdit={handleMoveEdit} addComments={addComments}/>
  )
}
