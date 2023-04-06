import {useMutation} from "react-query"
import { fetcher } from "@/util/queryClient"
import {useRecoilValue} from 'recoil'
import {tokenState} from "@/state/tokenState"
import { AxiosError } from "axios";
import {useRouter} from "next/router"

export default function useFollow (userId : number) {
    const token = useRecoilValue(tokenState);
    const router = useRouter();

    return useMutation(["follow", userId], () => fetcher({
        method : "post",
        path : `/api/v1/users/${userId}/follow`,
        headers : {
            Authorization : token,
        }
    }),
    {
        onSuccess : (data) => {
            console.log("follow success",data)
        },
        onError : (error) => {
            const {response} = error as AxiosError;
            const data = response?.data as {
                errorCode : number;
                errorMessage : string;
                path : string;
            }

            if(data.errorCode === 4008) {
                router.push(`/user/${userId}/profile`)
            }
        }
    })
}