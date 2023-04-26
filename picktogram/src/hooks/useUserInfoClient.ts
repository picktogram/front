import { useQuery } from 'react-query'
import { fetcher } from '@/util/queryClient'

export default function useUserInfoClient (id : number | null, token : string | null) {
    if(!token || !id) {
        return;
    }

    return useQuery(['getUser', id], () => fetcher({
        method : 'get',
        headers : {
            Authorization : token
        },
        path : `/api/v1/user/${id}`
    }), {
        enabled : !!id && !!token
    })
}