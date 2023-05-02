import { useQuery } from 'react-query'
import * as Apis from "picktogram-server-apis/api/functional";
import { SERVER_URL } from '@/util/constant';
import { isBusinessErrorGuard } from 'picktogram-server-apis/config/errors';

export default function useDetailArticle (articleId : number, token : string) {
    const fetchDetailArticle = async (articleId: number, token : string ) => {
        try {
            const response = await Apis.api.v1.articles.getOneDetailArticle({
                host : SERVER_URL as string,
                headers : {
                    Authorization : token
                }
            },
                articleId
            )

            if(isBusinessErrorGuard(response)){
                return;
            }

            return response.data

        } catch (error) {
            console.log(error)
        }
    }

    return useQuery(['getDetailArticle', articleId], () => fetchDetailArticle(articleId, token))
}