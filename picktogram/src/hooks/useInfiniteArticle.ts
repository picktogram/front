import { useInfiniteQuery } from "react-query";
import { infiniteFetcher } from '@/util/queryClient';

export type InfiniteArticle = {
    list : {
        writer : {
            id : number;
            nickname : string;
            profileImage : string;
            followStatus : string;
        };
        id : number;
        createdAt : string;
        contents : string;
        thumbnail : string | null | undefined;
        isMine : boolean;
        comments : any[]
    }[];
    page : number;
    totalPage : number;
}

export default function useInfiniteArticle (token : string, userId : number) {

    return useInfiniteQuery<InfiniteArticle>(['InfiniteArticle', userId], ({pageParam = 1}) => infiniteFetcher({
        method : 'get',
        path : `/api/v1/articles?writerId=${userId}&limit=100&page=`,
        headers : {
            Authorization : token
        },
        page : pageParam
    }), {
        getNextPageParam : (lastPage) => {
            return lastPage.page == lastPage.totalPage ? undefined : Number(lastPage.page) + 1
        }
    })
}