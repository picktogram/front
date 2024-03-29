import React, { useEffect, useState } from 'react'
import { useQueryClient } from 'react-query';
import { UserData } from '@/src/auth/tokens';

import styled from '@emotion/styled';
import useAcquaintance from '@/src/hooks/useAcquaintance';

import Pagination from '@/src/components/commons/Pagination/Pagination.container';
import NoDataIndicator from '../../commons/NoDataIndicator';

type UserRecommendProps = {
  user : UserData;
  token : string;
}

export default function UserRecommend({
    user,
    token
} : UserRecommendProps) {
  const [page, setPage] = useState<number>(1)
  const queryClient = useQueryClient()
  const acquaintanceData = useAcquaintance(token, page)

  console.log(acquaintanceData)

  return (
    <Container>
      <h2 style={{marginBottom : '1rem'}}>
        추천 유저
      </h2>
      <NoDataIndicator
        data={acquaintanceData ? acquaintanceData : {count : 0}}
        title='추천 유저가 없습니다.'
      />
      <Acquaintance>
        {
          acquaintanceData?.list.map((acquaintance : any) => (
            <User key={acquaintance.id}>
              <ProfileImage background={acquaintance.profileImage} />
              <Nickname>
                {acquaintance.nickname}
              </Nickname>
              <Reason>
                {acquaintance.reason}
              </Reason>
              <FollowButton>
                {'+'}
              </FollowButton>
            </User>
          ))
        }
      </Acquaintance>
      <RecommendPagination totalPage={acquaintanceData?.totalPage} setPage={setPage} page={page}/>
    </Container>
  )
}

const Container = styled.div`
  padding : 20px;
  width: 400px;
  height: auto;
  max-height: 1000px;
  background-color: white;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border: 1px solid lightgray;
  border-radius : 20px;
`

const Acquaintance = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  margin-bottom: 1rem;
`

const User = styled.div`
  width: 350px;
  display: flex;
  column-gap: 1rem;
  align-items: center;
  justify-content: space-between;
`

const ProfileImage = styled.div<{
  background : string | null | undefined
}>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-image: url(${(props) => props.background ? props.background : '/images/placeholder.png'});
  background-size: contain;
  background-repeat: no-repeat;
`

const Nickname = styled.div`
  width: 50px;
`

const Reason = styled.div`
  color : #b9b9b9;
`

const FollowButton = styled.button`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 50%;
  background-color: dodgerblue;
  color : white;
  cursor : pointer;

  &:hover {
    background-color: black;
  }
`

const RecommendPagination = styled(Pagination)`
  width: 50px;
`