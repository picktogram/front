import React, { useState } from 'react';
import * as Apis from 'picktogram-server-apis/api/functional';

import MyUI from './my.presenter';
import  Toast  from 'react-hot-toast';

import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRouter } from 'next/router';

import { SERVER_URL } from '@/util/constant';
import { PropsWithToken } from './my.types';
import { isBusinessErrorGuard } from 'picktogram-server-apis/config/errors';
import UserIntroduceModal from '../../commons/modals/userIntroduceModal';

const My : React.FC<PropsWithToken>= ({
    token
}) => {
    const router = useRouter()
    const queryClient = useQueryClient()
    const [introduce, setIntroduce] = useState<string>('')
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [filteredBoard, setFilteredBoard] = useState<any[]>([])
    const fetchUserProfile = async (token : string) => {
        try {
            const response = await Apis.api.v1.users.profile.getProfile({
                host : String(SERVER_URL),
                headers : {
                    Authorization : token
                }
            })

            if (isBusinessErrorGuard(response)) {
                Toast.error(response.data)
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

    const fetchBoards = async (token : string) => {
        try {
            const response = await Apis.api.v1.articles.getAllArticles({
                host : String(SERVER_URL),
                headers : {
                    Authorization : token
                }
            }, {
                limit : 100,
                page : 1
            })

            return response.data

        } catch (error) {
            console.log(error)
        }
    }
    const addIntroduce = async (token : string, introduce : string) => {
        try {
            const response = await Apis.api.v1.users.profile.updateProfile({
                host : String(SERVER_URL),
                headers : {
                    Authorization : token
                }
            }, {
                introduce : introduce
            })

            if(isBusinessErrorGuard(response)) {
                return;
            }
            return response.data
        } catch (error) {
            throw error
        }
    }

    const {data : userData, isLoading, isError} = useQuery("fetchUsers", () => fetchUserProfile(token));
    const {data : boardData} = useQuery('fetchBoards', () => fetchBoards(token), {
        enabled : !!userData,
        onSuccess(data) {
            const newData = data?.list.filter((board) => board.writer.id === userData?.id)
            setFilteredBoard(newData ? newData : [])
        },
    })

    const { mutate : addIntroduceMutate } = useMutation('addIntroduce', () => addIntroduce(token, introduce) , {
        onSuccess : () => {
            queryClient.invalidateQueries("fetchUsers")
        }
    })

    return (
        <>
            <MyUI
                user={userData ? userData : null}
                myBoard={filteredBoard}
                setIntroduce={setIntroduce}
                addIntroduce={addIntroduceMutate}
                setIsOpen={setIsOpen}
            />
            <UserIntroduceModal
                setIntroduce={setIntroduce}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                onSubmit={() => addIntroduceMutate()}
            />
        </>

    );
};

export default My;