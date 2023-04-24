import React, { useState } from 'react';
import * as Apis from 'picktogram-server-apis/api/functional';

import UserUI from './user.presenter';

import { useMutation, useQuery, useQueryClient, useInfiniteQuery } from "react-query";
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast'

import { SERVER_URL } from '@/util/constant';
import { PropsWithToken, UserBoards } from './user.types';
import { isBusinessErrorGuard } from 'picktogram-server-apis/config/errors';
import UserIntroduceModal from '../commons/modals/userIntroduceModal';
import useImageUpload from '@/src/hooks/useImageUpload';
import { fetcher, infiniteFetcher } from '@/util/queryClient';

const User : React.FC<PropsWithToken>= ({
    token
}) => {
    const router = useRouter()
    const queryClient = useQueryClient()
    const [introduce, setIntroduce] = useState<string>('')
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [coverImage, setCoverImage] = useState<string[]>([])

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

    // const fetchMyBoards = async (token : string, userId : number) => {
    //     try {
    //         const response = await Apis.api.v1.articles.getAllArticles({
    //             host : String(SERVER_URL),
    //             headers : {
    //                 Authorization : token
    //             }
    //         }, {
    //             limit : 100,
    //             page : 1,
    //             writerId : userId
    //         })

    //         return response.data

    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

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


    const { data : userData } = useQuery("fetchUsers", () => fetchUserProfile(token))
    // const { data : boardData } = useQuery('fetchMyBoards', () => fetcher({
    //     method : 'get',
    //     headers : {
    //         Authorization : token,
    //     },
    //     path : `api/v1/articles?writerId=${router.query.id}&page=1&limit=100`,
    // }))

    const {data : boardData, fetchNextPage} = useInfiniteQuery(['infiniteMyBoard'], ({pageParam = 1}) => infiniteFetcher({
        method : 'get',
        path : `/api/v1/articles?writerId=${router.query.id}&limit=100&page=`,
        headers : {
            Authorization : token
        },
        page : pageParam
    }), {
        getNextPageParam : (lastPage) => {
            return lastPage.page == lastPage.totalPage ? undefined : Number(lastPage.page) + 1
        }
    })

    const handleNextPage = () => {
        fetchNextPage()
    }

    const { mutate : addIntroduceMutate } = useMutation('addIntroduce', () => addIntroduce(token, introduce) , {
        onSuccess : () => {
            queryClient.invalidateQueries("fetchUsers")
        }
    })

    const { mutate : uploadImage } = useImageUpload('uploadCoverImage', token, (data) => {
        if(data?.length) {
            setCoverImage(data)
        }
    })

    // const {mutate : addImage} = useMutation('addCoverImage', async () => {
    //     try {
    //         const response = await Apis.api.v1.users.profile.cover_image.uploadCoverImage({
    //             host : String(SERVER_URL),
    //             headers : {
    //                 Authorization : token,
    //             }
    //         })
    //     } catch {

    //     }
    // })

    return (
        <>
            <UserUI
                user={userData ? userData : null}
                myBoard={boardData ? boardData : null}
                setIntroduce={setIntroduce}
                addIntroduce={addIntroduceMutate}
                setIsOpen={setIsOpen}
                coverImage={coverImage}
                setCoverImage={setCoverImage}
                uploadImage={uploadImage}
                handleNextPage={handleNextPage}
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

export default User;