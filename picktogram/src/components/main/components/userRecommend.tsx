import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled';
import { useInfiniteQuery, useQuery , useQueryClient } from 'react-query';
import { infiniteFetcher, fetcher} from '@/util/queryClient';
import { AxiosError } from 'axios';
import Pagination from '@/src/components/commons/Pagination/Pagination.container';


export default function UserRecommend({
    user
} : {
    user : {
        nickname : string;
        token : string;
    }
}) {
  const [page, setPage] = useState<number>(1);
  const queryClient = useQueryClient();

  const {data : recommendData } = useQuery<{
      list: [];
      totalResult: number;
      totalPage: number;
      search: null;
      page: number;
  }, AxiosError, {
      list: {
        id : number;
        nickname : string;
        profileImage : string;
      }[];
      totalResult: number;
      totalPage: number;
      search: null;
      page: number;
      hasMore : boolean;
  }>(['getRecommandUser', user.token, page], () => fetcher({
    method : 'get',
    path : `/api/v1/users/acquaintance?limit=10&page=${page}`,
    headers : {
      Authorization : user.token
    },
  }), {
    onSuccess : (data) => {
      console.log('success get recommendData', data);
    },
    staleTime : 5000,
    keepPreviousData : true,
    select : (data) => {
      return {
        ...data,
        hasMore : data.totalPage > page
      }
    }
  })

  useEffect(() => {
    if(recommendData?.hasMore) {
      queryClient.prefetchQuery(['getRecommandUser', user.token, page + 1], () =>
      fetcher({
        method : 'get',
        path : `/api/v1/users/acquaintance?limit=10&page=${page + 1}`,
        headers : {
          Authorization : user.token
        }
      })
      )
    }
  },[recommendData, page, queryClient])

  console.log('recommendData', recommendData);

  return (
    <Container>
      <div>
        {
          recommendData?.list.map((recommend) => (
            <div key={recommend.id}>
              {recommend.nickname}
            </div>
          ))
        }
      </div>
      <RecommendPagination totalPage={recommendData?.totalPage} setPage={setPage}/>
    </Container>
  )
}


const Container = styled.div`
  position: relative;
  width: 350px;
  height: 250px;
  background-color: white;
  border: none;
`

const RecommendPagination = styled(Pagination)`
  position: absolute;
  bottom: 0;
`