import React from 'react'
import styled from '@emotion/styled';
import { useInfiniteQuery } from 'react-query';
import { infiniteFetcher} from '@/util/queryClient';

export default function UserRecommend({
    user
} : {
    user : {
        nickname : string;
        token : string;
    }
}) {
  const {data : recommendData, fetchNextPage, fetchPreviousPage} = useInfiniteQuery<{
      list: [];
      totalResult: number;
      totalPage: number;
      search: null;
      page: number;
  }>(['getRecommandUser', user.token], ({pageParam = 1}) => infiniteFetcher({
    method : 'get',
    path : "/api/v1/users/acquaintance?limit=10&page=",
    headers : {
      Authorization : user.token
    },
    page : pageParam
  }), {
    getNextPageParam : (lastPage) => {
      return lastPage.page === lastPage.totalPage ? undefined : Number(lastPage.page) + 1;
    }
    ,
    getPreviousPageParam : (lastPage) => {
      return lastPage.page === 0 ? undefined : Number(lastPage.page) - 1;
    }
  })

  console.log('recommendData', recommendData);

  return (
    <Container>UserRecommend</Container>
  )
}


const Container = styled.div`
  width: 350px;
  height: 250px;
  background-color: white;
  border: none;
`