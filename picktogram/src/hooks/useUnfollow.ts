import {useMutation, useQueryClient} from "react-query"
import { fetcher } from "@/util/queryClient"
import {useRecoilValue} from 'recoil'
import {tokenState} from "@/state/tokenState"
import { AxiosError } from "axios";
import { toast } from 'react-hot-toast'

export default function useUnfollow(userId : number) {
    const token = useRecoilValue(tokenState)
    const queryClient = useQueryClient()

    return useMutation<boolean, AxiosError>(["unfollow", userId], () => fetcher({
        method : "delete",
        path : `/api/v1/users/${userId}/follow`,
        headers : {
            Authorization : token,
        }
    }),
    {
        onSuccess : (data) => {
            queryClient.invalidateQueries(['getUser', userId])
            queryClient.invalidateQueries(['infiniteBoard'])
            toast.success('unfollow success')
        },
        onError : (error) => {
            console.log(error.message)
            toast.error('unfollow failed')
        }
    })
}

