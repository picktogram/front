import { useQuery } from "react-query";
import Axios from "@/util/httpRequest";

export type Followees = {
    count : number;
    list : {
        profileImage : string | null | undefined;
        id : number;
        nickname : string;
        reason : string
    }[];
    page : number;
    totalPage : number;
    totalResult : number;
}

export default function useFollowees (token : string , userId : number, page : number) {
    // Have to convert to SDK, It's not ready
    const fetchFollowees = async () => {
        try {
            const response = await Axios.use({
                method : 'get',
                url : `/api/v1/users/${userId}/followees?page=${page}&limit=10`,
                headers : {
                    Authorization : token
                }
            })

            const result = await response.data.data

            return result
        } catch (error) {
            console.log(error)
        }
    }

    return useQuery<Followees>(['fetchFollowees', userId, page], () => fetchFollowees())

}
