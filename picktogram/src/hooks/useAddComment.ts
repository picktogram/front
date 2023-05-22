import { useMutation } from "react-query"
import * as Apis from "picktogram-server-apis/api/functional"
import { SERVER_URL } from "@/util/constant"
import { writeComment } from "picktogram-server-apis/api/functional/api/v1/articles/comments";

export default function useAddComment (token : string | null, ariticleId : number, onSuccess : () => void) {

    const addComment = async (data : writeComment.Input ) => {
        try {
            if(!token) return
            const response = await Apis.api.v1.articles.comments.writeComment({
                host : SERVER_URL as string,
                headers : {
                    Authorization : token
                }
            },
                ariticleId,
                data
            )

            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    return useMutation('addComment', (data : writeComment.Input) => addComment(data), {onSuccess : () => onSuccess()})
}