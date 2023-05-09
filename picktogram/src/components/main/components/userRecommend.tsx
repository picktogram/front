import React, { useEffect, useState } from 'react'
import { useQueryClient } from 'react-query';
import { UserData } from '@/src/auth/tokens';

import styled from '@emotion/styled';
import useAcquaintance from '@/src/hooks/useAcquaintance';

import Pagination from '@/src/components/commons/Pagination/Pagination.container';

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

  return (
    <Container>
      <Acquaintance>
        {
          acquaintanceData?.list.map((acquaintance : any) => (
            <User key={acquaintance.id}>
              <ProfileImage background={acquaintance.profileImage} >

              </ProfileImage>
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
  position: relative;
  width: 350px;
  height: 250px;
  background-color: white;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid lightgray;
  border-radius : 20px;
`

const Acquaintance = styled.div`
  min-height: 80%;
`

const User = styled.div`
  display: flex;
  column-gap: 1rem;
  align-items: center;
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
`

const Reason = styled.div`
  color : #b9b9b9;
`

const FollowButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 2rem;
  color : dodgerblue;
  cursor : pointer;
`

const RecommendPagination = styled(Pagination)`
  position: absolute;
  bottom: 0;
`