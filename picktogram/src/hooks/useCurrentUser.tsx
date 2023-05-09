import { useQuery } from "react-query";
import { SERVER_URL } from "@/util/constant";

import * as Apis from "picktogram-server-apis/api/functional";
import { isBusinessErrorGuard } from "picktogram-server-apis/config/errors";

export default function useCurrentUser(token : string) {

    const fetchUser = async (token : string) => {
        try {
            const response = await Apis.api.v1.users.profile.getProfile({
                host : SERVER_URL as string,
                headers : {
                    Authorization : token
                }
            }
)

            if(isBusinessErrorGuard(response)) {
                return
            }

            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    const { data } = useQuery(['getCurrentUser', token], () => fetchUser(token))

    if(!data) {
        return null
    }

    return {
        ...data
    }
}