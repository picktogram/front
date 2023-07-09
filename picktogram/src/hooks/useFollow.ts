import {useMutation, useQueryClient} from "react-query"
import { fetcher } from "@/util/queryClient"
import {useRecoilValue} from 'recoil'
import {tokenState} from "@/state/tokenState"
import { AxiosError } from "axios";
import { toast } from 'react-hot-toast'

export default function useFollow (userId : number, refetchFn? : () => void) {
    const token = useRecoilValue(tokenState)

    return useMutation<boolean, AxiosError>(["follow", userId], () => fetcher({
        method : "post",
        path : `/api/v1/users/${userId}/follow`,
        headers : {
            Authorization : token,
        }
    }),
    {
        onSuccess : (data) => {
            refetchFn?.()
            toast.success('팔로우 했습니다.')
        },
        onError : (error) => {
           console.log(error.message)
           toast.error('follow failed')
        }
    })
}