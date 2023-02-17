import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { UserMenu } from "@/src/components/commons/header";
import Link from 'next/link'
import styled from "@emotion/styled";
import { useRouter } from "next/router"
import { clearUser } from "@/src/auth/tokens";


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


const UserModal = ({
    setShowUserModal
}: {
    setShowUserModal : Dispatch<SetStateAction<boolean>>;
}) => {
    const router = useRouter();
    const ref = useRef(null);

    console.log(ref);

    useEffect(() => {
        const listener = (e : any) => {
            if(!ref.current || ref.current.contains(e.target))  {
                return;
            }
            setShowUserModal(false);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        }
    }, [])
    return (
        <UserMenu ref={ref}>
            <List>
                <Item>
                    <Link href="/user/profile">마이페이지</Link>
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

        </UserMenu>
    )
}

export default UserModal