import React, { useState } from 'react';
import axios, { AxiosError } from "axios"
import * as Apis from 'picktogram-server-apis/api/functional';

import MyUI from './my.presenter';

import { useQuery } from "react-query"
import { useRouter } from 'next/router';

import { SERVER_URL } from '@/util/constant'
import { PropsWithToken } from './my.types'
import { DecodedUserToken } from 'picktogram-server-apis/models/tables/user.entity';

const My : React.FC<PropsWithToken>= ({
    token
}) => {
    const router = useRouter();
    const [filteredBoard, setFilteredBoard] = useState<any[]>([])
    const fetchUserProfile = async (token : string) => {
        try {
            const response = await Apis.api.v1.users.profile.getProfile({
                host : String(SERVER_URL),
                headers : {
                    Authorization : token
                }
            })

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

    const {data : userData, isLoading, isError} = useQuery<DecodedUserToken | null | undefined, AxiosError>("fetchUsers", () => fetchUserProfile(token));
    const {data : boardData} = useQuery('fetchBoards', () => fetchBoards(token), {
        enabled : !!userData,
        onSuccess(data) {
            const newData = data?.list.filter((board) => board.writer.id === userData?.id)
            setFilteredBoard(newData ? newData : [])
        },
    })

    return (
       <MyUI
        user={userData ? userData : null}
        myBoard={filteredBoard}
        />
    );
};

export default My;