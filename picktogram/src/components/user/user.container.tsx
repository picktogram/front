import React, { useState } from 'react';
import * as Apis from 'picktogram-server-apis/api/functional';
import { SERVER_URL } from '@/util/constant';
import { PropsWithToken } from './user.types';
import { isBusinessErrorGuard } from 'picktogram-server-apis/config/errors';
import { useQuery } from "react-query";
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast'

import UserProfileModal from '../commons/modals/userProfileModal';
import useInfiniteArticle from '@/src/hooks/useInfiniteArticle';

import UserUI from './user.presenter';

const User : React.FC<PropsWithToken>= ({
    token
}) => {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const fetchUserProfile = async (token : string) => {
        try {
            const response = await Apis.api.v1.users.getDetailProdfile({
                host : String(SERVER_URL),
                headers : {
                    Authorization : token
                },
            },
                Number(router.query.id)
            )

            if (isBusinessErrorGuard(response)) {
                toast.error(response.data)
                return;
            }

            if(response.data) {
                return response.data
            }

            return null
        } catch (error) {
            console.log(error)
        }
      }

    const { data : userData, refetch : refetchUserData } = useQuery(['fetchUsers', router.query.id], () => fetchUserProfile(token))

    const {data : boardData, fetchNextPage} = useInfiniteArticle(token, Number(router.query.id))

    const handleNextPage = () => {
        fetchNextPage()
    }

    return (
        <>
            <UserUI
                user={userData ? userData : null}
                refetchUser={refetchUserData}
                myBoard={boardData ? boardData : null}
                setIsOpen={setIsOpen}
                handleNextPage={handleNextPage}
                token={token}
            />
            <UserProfileModal
                token={token}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                refetchUser={refetchUserData}
            />
        </>
    );
};

export default User;