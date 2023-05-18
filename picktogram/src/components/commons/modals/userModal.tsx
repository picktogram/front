import React, { useState } from 'react';
import { useRouter } from 'next/router'
import { clearUser } from "@/src/auth/tokens";
import { useRecoilState } from 'recoil'
import { userModalState } from '@/state/userModalState'
import styled from '@emotion/styled'
import Modal from '../Modal';
import ProfileImage from '../profileImage';

interface UserModalProps {
    userId : number | undefined;
    profileImage? : string | null;
    username? : string
}

const UserModalBodyContainer = styled.div`
  z-index: 10;
  max-width: 100%;
  min-height: 500px;
  color : white;
`

const List = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
    row-gap: 1.2rem;
`
const Item = styled.li`
    color : white;
`
const Button = styled.button`
    position: relative;
    width: 100%;
    color : white;
    border: none;
    background-color: transparent;
    cursor: pointer;
    font-size: 1.5rem;

    &:hover {
      background-color: rgba(0,0,0,0,7);
      border-radius: 20px;
      opacity: 0.5;
      border: none;
    }
`

const MyPage = styled(Button)`
    padding: 1rem;
    display: flex;
    align-items: center;
    column-gap: 1rem;
    font-size: 1.75rem;
    border-bottom: 1px solid lightgray;
`

const Logout = styled(Button)`
    display: flex;
    align-items: center;
    column-gap: 1rem;
`

const userModal : React.FC<UserModalProps> = ({
    userId,
    username,
    profileImage
}) => {
    const router = useRouter()
    const [showUserModal, setUserModal] = useRecoilState(userModalState)

    const onClose = () => {
        setUserModal(false)
    }

    const onMove = (url : string) => {
        onClose()
        router.push(url)
    }

    const bodyContent = (
        <UserModalBodyContainer>
            <List>
                <Item>
                    <MyPage onClick={() => onMove(`/user/profile/${userId}`)}>
                        <ProfileImage
                            width={75}
                            height={75}
                            isCircle={true}
                            profileImage={profileImage}
                        />
                        {username}
                    </MyPage>
                </Item>
                <Item>
                    <Logout onClick={() => {
                        clearUser()
                        onClose()
                        router.push("/login")
                    }}>
                        <i className="ri-logout-box-line"></i>
                        로그아웃
                    </Logout>
                </Item>
            </List>
         </UserModalBodyContainer>
    )

    return (
        <Modal
            title='User'
            isOpen={showUserModal}
            onClose={onClose}
            body={bodyContent}
            label='UserModal'
        />
    );
};

export default userModal;