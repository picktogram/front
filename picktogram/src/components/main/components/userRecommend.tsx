import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled';
import { useQueryClient } from 'react-query';
import Pagination from '@/src/components/commons/Pagination/Pagination.container';
import useAcquaintance from '@/src/hooks/useAcquaintance';


export default function UserRecommend({
    user
} : {
    user : {
        nickname : string;
        token : string;
    }
}) {
  const [page, setPage] = useState<number>(1)
  const queryClient = useQueryClient()
  const acquaintanceData = useAcquaintance(user.token, page)

  return (
    <Container>
      <Acquaintance>
        {
          acquaintanceData?.list.map((acquaintance) => (
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
      <RecommendPagination totalPage={acquaintanceData?.totalPage} setPage={setPage}/>
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