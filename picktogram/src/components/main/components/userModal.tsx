import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { UserMenu } from "@/src/components/main/components/header";
import Link from 'next/link'
import styled from "@emotion/styled";
import { useRouter } from "next/router"
import { clearUser } from "@/src/auth/tokens";
import { useSetRecoilState} from 'recoil';
import { modalState } from "@/state/modalState"

const UserModal = () => {
    const router = useRouter();
    const ref = useRef<any>(null);
    const setShowModal= useSetRecoilState(modalState)

    useEffect(() => {
        const listener = (e : any) => {
            if(!ref.current || ref.current.contains(e.target))  {
                return;
            }
            setShowModal(false);
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

        </UserMenu>
    )
}

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
export default UserModal
