import { useQuery } from "react-query"
import * as Apis from "picktogram-server-apis/api/functional"
import { SERVER_URL } from "@/util/constant"
import { isBusinessErrorGuard } from 'picktogram-server-apis/config/errors';

export default function useAcquaintance(token : string, page : number) {

    const fetchAcquaitance = async (token : string, page : number) => {
        try {
            const response = await Apis.api.v1.users.acquaintance.getAcquaintance({
                    host : SERVER_URL as string,
                    headers : {
                        Authorization : token
                    }
                },
                {
                    page,
                    limit : 3
                }
            )

            if(isBusinessErrorGuard(response)) {
                return;
            }
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    const { data } = useQuery(['getAcquaintance', token, page], () => fetchAcquaitance(token, page), {
        staleTime : 5000,
        keepPreviousData : true,
    })

    if(!data) {
      return null
    }

    return {
        ...data,
        hasMore : data.totalPage > page
    }
}