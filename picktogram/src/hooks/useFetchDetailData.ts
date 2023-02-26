import { useQuery } from "react-query"
import {fetcher} from "@/util/queryClient"

const useFetchDetailData = ({
    queryKey,
    id,
    token,
} : {
    queryKey : string;
    id : string | string[] | undefined
    token : string;
}) => {
    return(
        useQuery([queryKey,id], () => fetcher({
            method : 'get',
            path : `/api/v1/articles/${id}`,
            headers : {
                "Authorization" : `Bearer ${token}`
            }
        }), {
            onSuccess: (data) => {
                console.log("success", data)
            }
        })
    )
}

export default useFetchDetailData