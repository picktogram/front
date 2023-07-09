import { AxiosError } from "axios";

export default function parceError (error : AxiosError) {
    const errorText = error.response?.statusText

    switch (errorText){
        case 'Unauthorized':
           return '등록된 회원정보가 없습니다. 이메일과 패스워드를 확인해주세요.'

        default:
           return '알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'

      }
}