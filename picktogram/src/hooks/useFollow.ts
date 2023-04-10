import {useMutation} from "react-query"
import { fetcher } from "@/util/queryClient"
import {useRecoilValue} from 'recoil'
import {tokenState} from "@/state/tokenState"
import { AxiosError } from "axios";
import { toast } from 'react-hot-toast'

export default function useFollow (userId : number) {
    const token = useRecoilValue(tokenState);

    return useMutation<boolean, AxiosError>(["follow", userId], () => fetcher({
        method : "post",
        path : `/api/v1/users/${userId}/follow`,
        headers : {
            Authorization : token,
        }
    }),
    {
        onSuccess : (data) => {
            console.log("follow success", data)
            toast.success('follow success')
        },
        onError : (error) => {
           console.log(error.message)
           toast.error('follow failed')
        }
    })
}