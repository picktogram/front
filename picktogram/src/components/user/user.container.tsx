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
import Header from '../commons/layout/header';

const User : React.FC<PropsWithToken>= ({
    token
}) => {
    const router = useRouter()
    const queryClient = useQueryClient()
    const [introduce, setIntroduce] = useState<string>('')
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [coverImage, setCoverImage] = useState<string[]>([])

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

    const addCoverImage = async (token : string, image : string) => {
        try {
            const response = await Apis.api.v1.users.profile.updateProfile({
                host : String(SERVER_URL),
                headers : {
                    Authorization : token
                }
            }, {
                coverImage : image
            })

            if(isBusinessErrorGuard(response)) {
                return;
            }
            return response.data
        } catch (error) {
            throw error
        }
    }

    const { data : userData, refetch : refetchUserData } = useQuery(['fetchUsers', router.query.id], () => fetchUserProfile(token))

    const {data : boardData, fetchNextPage} = useInfiniteQuery(['infiniteMyBoard', router.query.id], ({pageParam = 1}) => infiniteFetcher({
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

    // const {data : followees} = useQuery(['getFollowees', router.query.id], async () => {
    //     try {
    //         const response = await Apis.api.v1.users.followees.checkFollowees({
    //             host : SERVER_URL as string,
    //             headers : {
    //                 Authorization : token
    //             }
    //         },
    //             Number(router.query.id)
    //         )
    //         return response.data.data
    //     } catch (error) {
    //         console.log(error)
    //     }
    // })

    const handleNextPage = () => {
        fetchNextPage()
    }

    const { mutate : addIntroduceMutate } = useMutation('addIntroduce', () => addIntroduce(token, introduce) , {
        onSuccess : () => {
            queryClient.invalidateQueries(["fetchUsers", router.query.id])
        }
    })

    const {mutate : addCoverImageMutate } = useMutation('addCoverImage', (image : string) => addCoverImage(token, image) , {
        onSuccess : () => {
            queryClient.invalidateQueries(["fetchUsers", router.query.id])
        }
    })

    const { mutate : uploadImage } = useImageUpload('uploadCoverImage', token, async (data) => {
        if(data?.length) {
            setCoverImage(data)
            addCoverImageMutate(data[0])
        }
    })

    console.log('user', userData)

    return (
        <>
            <UserUI
                user={userData ? userData : null}
                refetchUser={refetchUserData}
                myBoard={boardData ? boardData : null}
                setIntroduce={setIntroduce}
                addIntroduce={addIntroduceMutate}
                setIsOpen={setIsOpen}
                coverImage={userData?.coverImage ? userData.coverImage : ''}
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