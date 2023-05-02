interface DecodeTokenReturn {
    id? : number;
    name? : string;
    nickname : string;
    email : string
}

export const decodeToken = (token : string)  => {
    const base64Payload  = token?.split('.')[1]

    if(!base64Payload) {
      console.log('token is invaild')
      return null
    }

    const payload = Buffer.from(base64Payload , 'base64')
    const userData = JSON.parse(payload.toString())

    // console.log('decode', userData);

    return {
      ...userData
    }
}
