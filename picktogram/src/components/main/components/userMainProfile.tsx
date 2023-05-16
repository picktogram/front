import React, { useEffect, useState } from 'react'
import styled from "@emotion/styled"
import {useRouter} from "next/router"
import { useQuery } from 'react-query'
import { fetcher } from '@/util/queryClient'
import { UserData } from '@/src/auth/tokens'
import useCurrentUser from '@/src/hooks/useCurrentUser'
import { mediaQuery } from '@/styles/media'

type UserMainProfileProps = {
    user : UserData;
    token : string;
}

export default function UserMainProfile({
    user,
    token,
} : UserMainProfileProps) {
    const userData = useCurrentUser(token)
    const {data : reputationData} = useQuery(['getReputation', userData?.id],
        () => fetcher({method : 'get', path : `/api/v1/users/${userData?.id}/reputation`,
        headers : {
            Authorization : token
            }
        }),
        {
            enabled : !!userData?.id,
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
    const [showModal, setShowModal] = useState<boolean>(false)


    useEffect(() => {
        const listener = (boolean : boolean) => {
            setShowModal(boolean)
        }
        const infoIcon = document.querySelector('.ri-information-line')
        infoIcon?.addEventListener('mouseover', () => listener(true))
        infoIcon?.addEventListener('mouseout', () => listener(false))

        return () => {
            infoIcon?.removeEventListener('mouseover', () => listener(true))
            infoIcon?.removeEventListener('mouseout', () => listener(false))
        }
    },[])

    return (
        <Container>
            <UserInfoWrapper>
                <UserIcon background={userData?.profileImage}/>
                <UserProfile>
                    <UserName>{user.nickname}</UserName>
                    <UserReputation>{reputationData?.sum}점</UserReputation>
                    <ReputationInfo className="ri-information-line"></ReputationInfo>
                    {

                        showModal && (
                            <div style={{width : '200px'}}>활동량에 따라 매겨지는 평판 점수입니다.</div>
                        )
                    }
                </UserProfile>
            </UserInfoWrapper>
            <UserCreateWrapper>
                <Button onClick={() => router.push("/dashboard/new")}>게시글 작성</Button>
            </UserCreateWrapper>
        </Container>
    )
}


const Container = styled.div`
    width : 95%;
    margin: 0 auto;
    min-height: 100px;
    background-color: white;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    margin-bottom: 20px;
    border : 1px solid lightgray;

    ${mediaQuery[3]} {
        width: 800px;
    }
`

const UserInfoWrapper = styled.div`
    display: flex;
    flex-direction: row;
    column-gap : 1rem;
    margin-bottom: 1rem;
`

const UserProfile = styled.div`
    display: flex;
    column-gap: 1rem;
    padding: 20px;
`

const UserName = styled.span`
    font-size: 20px;
`

const UserIcon = styled.div<{
    background : string | null | undefined
}>`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px solid gray;
    background-image: url(${(props) => props.background ? props.background : 'images/placeholder.png'});
    background-size: cover;
    background-repeat: no-repeat;
`

const UserReputation = styled.span``

const ReputationInfo = styled.i`
`

const UserCreateWrapper = styled.div`
    width: 100%;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
`

const Button = styled.button`
    width: 150px;
    height: 50px;
    padding: 1rem;
    background-color: dodgerblue;
    color : white;
    border: none;
    border-radius: 20px;
    cursor: pointer;

    &:hover {
        background-color: black;
    }
`
