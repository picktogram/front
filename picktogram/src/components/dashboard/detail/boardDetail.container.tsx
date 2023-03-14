import React, { Suspense, use } from 'react'
import BoardDetailUI from './boardDetail.presenter'
import axios from 'axios';
import { useRouter } from 'next/router'
import { useMutation, useInfiniteQuery, useQueryClient  } from 'react-query';
import { SERVER_URL } from "@/util/constant"
import useFetchDetailData from '@/src/hooks/useFetchDetailData';
import Loader from "./boardDetail.loader"
import { infiniteFetcher } from '@/util/queryClient';

export default function BoardDetail({
    token,
    user
} : {
    token : string;
    user : {nickname : string};
}) {
    const router = useRouter();
    const queryClient = useQueryClient();
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
            queryClient.invalidateQueries(['getComments', router.query.id ]);
        },
    });

    const {data : commentsData, fetchNextPage, fetchPreviousPage} = useInfiniteQuery<{
        list : {
            xPosition : string;
            yPosition : string;
            id : number;
            writerId : number;
            contents : string;
        }[];
        count : number;
        totalResult : number;
        totalPage : number;
        page : number
    }>(['getComments', router.query.id ], ({pageParam = 1}) => infiniteFetcher({
        method : 'get',
        path : `/api/v1/articles/${router.query.id}/comments?limit=10&page=`,
        headers : {
            Authorization : token
        },
        page : pageParam,
    }), {
        getNextPageParam : (lastPage) => {
            return lastPage.page === lastPage.totalPage ? undefined : Number(lastPage) + 1;
        },
        getPreviousPageParam : (lastPage) => {
            return lastPage.page === 0 ? undefined : Number(lastPage.page) - 1;
        },
        onSuccess : () => {
            console.log('success getCommets');
        }
    })

    const handleMoveEdit = () => {
        router.push(`/dashboard/${router.query.id}/edit`);
    }


    if(isError) {
        return <div>Error...</div>
    }


  return (
    <Suspense fallback={<Loader />}>
        <BoardDetailUI
            data={data}
            handleMoveEdit={handleMoveEdit}
            addComments={addComments}
            user={user}
            commentsData={commentsData}/>
    </Suspense>
  )
}

