import React, { useEffect, useState } from 'react';
import * as S from './user.style'
import Image from 'next/image'
import UserCoverImage from './components/userCoverImage'
import Card from '../commons/card/card';
import useFollow from "@/src/hooks/useFollow"
import useUnfollow from '@/src/hooks/useUnfollow';

import { UserPageUIProps, UserProfile } from './user.types'

import { useRecoilValue } from 'recoil'
import { myIdState } from '@/state/tokenState'
import { useRouter } from 'next/router';
import UserFollowees from './components/userFollowees';

const UserUI = ({
    user,
    refetchUser,
    myBoard,
    setIsOpen,
    uploadImage,
    handleNextPage,
    token
} :
    UserPageUIProps
    ) => {
    const router = useRouter()
    const {mutate : userUnfollow} = useUnfollow(Number(router.query.id), refetchUser)
    const {mutate : userFollow} =  useFollow(Number(router.query.id), refetchUser)
    const curretId = useRecoilValue(myIdState)

    const [followButton, setFollowButton] = useState<string>('')
    const [isSame, setIsSame] = useState<boolean>(false)

    const handleFollow = () => {
        if(user?.followStatus === 'follow' || user?.followStatus === 'followUp') {
            userUnfollow()
            setFollowButton('팔로우 하기')
        }

        if(user?.followStatus === 'nothing' || user?.followStatus === 'reverse' ) {
            userFollow()
            setFollowButton('팔로우 중')
        }
    }

    useEffect(() => {
        if(user?.followStatus === 'follow' || user?.followStatus === 'followUp') {
            setFollowButton('팔로우 중')
        }

        if(user?.followStatus === 'nothing' || user?.followStatus === 'reverse' ) {
            setFollowButton('팔로우 하기')
        }
    }, [])

    useEffect(() => {
        if(!curretId) return

        if(curretId == user?.id) {
            setIsSame(true)
        } else {
            setIsSame(false)
        }
    }, [curretId, user?.id])

    return (
         <S.Container>
            <S.LeftSection>
                <UserCoverImage
                    uploadImage={uploadImage}
                    coverImage={user?.coverImage}
                    isCurrentUser={isSame}
                />
                <S.UserInfo>
                    <S.ProfileImage
                        background={user?.profileImage}
                    />
                    <S.UserName>{user?.name}</S.UserName>
                    <S.UserNickName>{user?.nickname && user?.name}</S.UserNickName>
                    <S.UserIntroduce>
                        {
                            isSame && (
                                <S.Button
                                    onClick={() => setIsOpen(true)}
                                >
                                    프로필 수정
                                </S.Button>
                            )
                        }
                        {
                            !isSame && (
                                <S.Button
                                    onClick={handleFollow}
                                >
                                    {followButton}
                                </S.Button>
                            )
                        }

                        <p>
                            {
                                user?.introduce ? user.introduce : '소개글을 추가해주세요.'
                            }
                        </p>
                    </S.UserIntroduce>
                </S.UserInfo>
                <S.UserArticle>
                {myBoard?.pages.map((page) => (
                        <React.Fragment key={page.page}>
                            {page.list.map((post , index : number) => (
                                <Card
                                    key={post.id}
                                    isLast={index === page.list.length - 1}
                                    newLimit={handleNextPage}
                                    data={post}
                                />
                            ))}
                        </React.Fragment>
                    ))}
                </S.UserArticle>
            </S.LeftSection>
            {/* 유저 정보 */}


          <S.RightSection>
            {/* 추천 유저 */}
            <UserFollowees token={token} />

          </S.RightSection>


        </S.Container>
    );
};

export default UserUI;