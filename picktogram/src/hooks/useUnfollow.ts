import {useMutation} from "react-query"
import { fetcher } from "@/util/queryClient"

export default function useUnfollow(userId : number) {
    const token = localStorage.getItem("token");
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

