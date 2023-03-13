import {useMutation} from "react-query"
import { fetcher } from "@/util/queryClient"

export default function useFollow (userId : number) {
    const token = localStorage.getItem("token");
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
        }
    })
}