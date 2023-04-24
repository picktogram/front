import React, { useState } from 'react';
import * as S from './user.style'
import Image from 'next/image'
import UserCoverImage from './components/userCoverImage'
import { UserPageUIProps, UserProfile } from './user.types'
import Card from '../main/components/card/card';

const UserUI = ({
    user,
    myBoard,
    setIsOpen,
    uploadImage,
    coverImage,
    setCoverImage,
    handleNextPage
} :
    UserPageUIProps
    ) => {

        console.log(coverImage)
    return (
         <S.Container>
            <S.LeftSection>
                <UserCoverImage
                    uploadImage={uploadImage}
                    coverImage={coverImage}
                />
                <S.UserInfo>
                    <Image
                        // src={user?.profileImage ? user.profileImage : '/images/placeholder.png'}
                        src='/images/placeholder.png'
                        alt='User image'
                        width={100}
                        height={100}
                    />
                    <p style={{fontSize: '3rem'}}>{user?.name}</p>
                    <p>{user?.nickname}</p>
                    <div style={{
                        width : '100%',
                        display : 'flex',
                        justifyContent : 'space-between'
                    }}>
                        <button
                            style={{
                                width : '150px',
                                height : '50px',
                                padding : '1rem',
                                border : 'none',
                                backgroundColor : 'dodgerblue',
                                color : 'white',
                                borderRadius : '20px'
                            }}
                            onClick={() => setIsOpen(true)}
                        >
                            소개글 추가
                        </button>
                        <p>
                            {
                                user?.introduce ? user.introduce : '소개글을 추가해주세요.'
                            }
                        </p>
                    </div>
                </S.UserInfo>
                <S.UserArticle>
                {myBoard?.pages.map((page : any, index : number) => (
                    <React.Fragment key={index}>
                        {page.list.map((post : any , index : number) => (
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


          <div>
            {/* 추천 유저 */}
            <div>
                안뇽
            </div>

          </div>


        </S.Container>
    );
};

export default UserUI;