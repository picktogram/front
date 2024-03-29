import React, { useState } from 'react';
import { useRouter } from 'next/router'
import { UserFolloweesProps } from '../user.types';

import styled from '@emotion/styled'

import ProfileImage from '../../commons/profileImage';
import Pagination from '../../commons/Pagination/Pagination.container';
import useFollowees from '@/src/hooks/useFollowees';
import NoDataIndicator from '../../commons/NoDataIndicator';

const Container = styled.div`
    padding: 1rem;
    display : flex;
    flex-direction: column;
    row-gap: 1rem;
    border: 1px solid lightgray;
    border-radius: 20px;
`

const Followee = styled.div`
    height: 70px;
    padding : 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 1rem;
    border: 1px solid lightgray;
    border-radius: 20px;
`

const Name = styled.div``

const Button = styled.button`
    width: 25px;
    height: 25px;
    color : white;
    background-color: dodgerblue;
    border: none;
    border-radius: 50%;
    cursor: pointer;

    &:hover {
        background-color: black;
    }
`
const UserFollowees : React.FC<UserFolloweesProps> = ({
    token
}) => {
    const router = useRouter()
    const [page, setPage] = useState<number>(1)
    const { data : followees} = useFollowees(token, Number(router.query.id), page)

    return (
        <Container>
            <h2>팔로워</h2>
            <NoDataIndicator
                data={followees ? followees : {count : 0}}
                title='팔로워가 없습니다. 다양한 활동을 통해 팔로워를 늘려보세요.'
            />
            {followees?.list.map((followee) => (
                <Followee>
                    <ProfileImage profileImage={followee?.profileImage} isCircle={true}/>
                    <Name>
                        {followee.nickname}
                    </Name>
                    <Button onClick={() => router.push(`/user/profile/${followee.id}`) }>
                        <i className="ri-arrow-right-line"></i>
                    </Button>
                </Followee>
            ))}
            <Pagination totalPage={followees?.totalPage} page={page} setPage={setPage}/>
        </Container>
    );
};

export default UserFollowees;