import {useMutation} from "react-query"
import { fetcher } from "@/util/queryClient"
import {useRecoilValue} from 'recoil'
import {tokenState} from "@/state/tokenState"


export default function useUnfollow(userId : number) {
    const token = useRecoilValue(tokenState);

    return useMutation(["unfollow", userId], () => fetcher({
        method : "delete",
        path : `/api/v1/users/${userId}/follow`,
        headers : {
            Authorization : token,
        }
    }),
    {
        onSuccess : (data) => {
            console.log("unfollow success",data)
        }
    })
}

