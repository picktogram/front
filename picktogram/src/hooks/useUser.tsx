import { useQuery } from "react-query";
import { SERVER_URL } from "@/util/constant";

import * as Apis from "picktogram-server-apis/api/functional";
import { isBusinessErrorGuard } from "picktogram-server-apis/config/errors";

export default function useUser(userId : number | null, token : string | null) {
    const fetchUser = async (userId : number | null, token : string | null) => {
        try {
            if(!token  || !userId) {
                return
            }
            const response = await Apis.api.v1.users.getDetailProdfile({
                host : SERVER_URL as string,
                headers : {
                    Authorization : token
                }
            },
                userId
            )

            if(isBusinessErrorGuard(response)) {
                return
            }

            return response.data
        } catch (error) {
            console.log(error)
        }
    }


    return useQuery(['getUser', userId, token], () => fetchUser(userId, token))
}