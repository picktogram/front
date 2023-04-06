import React from 'react'
import styled from "@emotion/styled"
import {useRouter} from "next/router"
import { useQuery } from 'react-query'
import { fetcher } from '@/util/queryClient'

export default function UserMainProfile({
    user
} : {
    user : {
        nickname : string
        token : string
    },
}) {
    const {data : userId} = useQuery(['getUser', user.token], () => fetcher({method : "get", path : "/api/v1/users/profile", headers : {Authorization : user.token}}), {
        select : (data) => data.id
    })

    const {data : reputationData} = useQuery(['getReputation', userId],
        () => fetcher({method : 'get', path : `/api/v1/users/${userId}/reputation`,
        headers : {
            Authorization : user.token
            }
        }),
        {
            enabled : !!userId,
            select : (data : {
                question : number;
                answer : number;
                adopted : number;
                writing : number;
                likes : number;
                id: number
            }) => {
                return {
                    question : data.question,
                    answer : data.answer,
                    adopted : data.adopted,
                    writing : data.writing,
                    likes : data.likes,
                    sum : data.adopted + data.answer + data.likes + data.question + data.writing,
                }
            }
        }
    )

    const router = useRouter();

    return (
        <Container>
            <UserInfoWrapper>
                <UserIcon>
                    <i className="ri-user-3-line"></i>
                </UserIcon>
                <UserName>{user.nickname}</UserName>
                <UserReputation>{reputationData?.sum}점</UserReputation>
            </UserInfoWrapper>
            <UserCreateWrapper>
                <Button onClick={() => router.push("/dashboard/new")}>게시글 작성</Button>
            </UserCreateWrapper>
        </Container>
    )
}


const Container = styled.div`
    width: 650px;
    margin: 0 auto;
    min-height: 100px;
    background-color: white;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    margin-bottom: 20px;
`

const UserInfoWrapper = styled.div`
    display: flex;
    flex-direction: row;
    column-gap : 1rem;
    margin-bottom: 1rem;
`

const UserName = styled.span`
    font-size: 20px;
`

const UserIcon = styled.div`
    border-radius: 50%;
    padding: 5px;
    border: 1px solid gray;
    font-size: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    & i {
        color : gray
    }
`

const UserReputation = styled.span``

const UserCreateWrapper = styled.div`
    width: 100%;
    margin-bottom: 1rem;
`

const Button = styled.button`
    width: 150px;
    height: 50px;
    padding: 1rem;
    background-color: transparent;
    cursor: pointer;
`
