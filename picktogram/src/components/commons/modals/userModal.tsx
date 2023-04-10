import React, { useState } from 'react';
import { useRouter } from 'next/router'
import { clearUser } from "@/src/auth/tokens";
import { useRecoilState } from 'recoil'
import { userModalState } from '@/state/userModalState'
import styled from '@emotion/styled'
import Modal from '../Modal';
import Link from 'next/link'

const UserModalBodyContainer = styled.div`
  z-index: 10;
  max-width: 100%;
  min-height: 500px;
  color : white;
`

const List = styled.ul`
    list-style: none;
`
const Item = styled.li`
    color : white;
`

const Logout = styled.button`
    border: none;
    background-color: transparent;
    color : white;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`

const userModal = () => {
    const router = useRouter()
    const [showUserModal, setUserModal] = useRecoilState(userModalState)
    const onClose = () => {
        setUserModal(false)
    }

    const bodyContent = (
        <UserModalBodyContainer>
            <List>
                <Item>
                    <Link href="/user/my">마이페이지</Link>
                </Item>
                <Item>
                    <Logout onClick={() => {
                        clearUser();
                        router.push("/login")
                    }}>
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