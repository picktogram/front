import { useQuery } from "react-query";
import { SERVER_URL } from "@/util/constant";
import { isBusinessErrorGuard } from 'picktogram-server-apis/config/errors';

import * as Apis from "picktogram-server-apis/api/functional";

export default function useBoard (token : string | null, articleId : number) {
    const fetchBoard = async () => {
        try {
            if(!token) return null
            const response = await Apis.api.v1.articles.getOneDetailArticle({
                host : SERVER_URL as string,
                headers : {
                    Authorization : token
                }
            },
                articleId
            )

            if(isBusinessErrorGuard(response)) return null;

            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    return useQuery(['fetchBoard', articleId], () => fetchBoard())

}