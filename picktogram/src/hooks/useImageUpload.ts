import { SERVER_URL } from "@/util/constant";
import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";

export default function useImageUpload (key : string, token : string, onSuccess? : (arg? : string[]) => void) {
    return useMutation<string[], AxiosError>(key, async (data : any) => {
        try {
            let formData = new FormData()
            formData.append('file', data)

            const response = await axios.post(`${SERVER_URL}/api/v1/users/profile/cover-image`, formData, {
                headers : {
                    'Authorization' : token,
                    'Content-Type': 'multipart/form-data',
                }
            })

            return response.data.data
        } catch (error) {
            console.log(error)
        }
    }, {
        onSuccess : (data) => {
            console.log(data)
            if(onSuccess === undefined) return;

            onSuccess(data)
        }
    })
}