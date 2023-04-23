import React, { useState } from 'react';
import * as S from './my.style'
import Image from 'next/image'
import UserCoverImage from '../../commons/Imagebox/userCoverImage';
import {MyPageUIProps, UserProfile} from './my.types'
import UserIntroduceModal from '../../commons/modals/userIntroduceModal';

const MyUI = ({
    user,
    myBoard,
    setIsOpen
} :
    MyPageUIProps
    ) => {

    return (
         <S.Container>
            <S.LeftSection>
                <UserCoverImage />
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
                    {myBoard.map((board) => (
                        <div>
                            { board.contents}
                        </div>
                    ))}
                </S.UserArticle>
            </S.LeftSection>
            {/* 유저 정보 */}


          <div>
            {/* 추천 유저 */}
            <div>

            </div>

          </div>


        </S.Container>
    );
};

export default MyUI;