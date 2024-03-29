import { IncomingMessage } from 'http';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';

export type UserData = {
  id : number;
  name : string;
  nickname : string;
  email : string;
  birth? : string | null;
  gender : boolean;
  lat? : number;
  exp? : number
}

export type UserFromRequest = {
  user : UserData,
  token : string
}

// 사용자 인증을 위해 token을 쿠키 저장
export function authenticateUser( token : string ): void {
    document.cookie = `token=${token};max-age=3600`;
}

// 서용자 로그아웃을 위해 쿠키 토큰을 삭제
export const clearUser = (): void => {
    document.cookie = `token=0;max-age=0`;
}

const decodeToken = (token : string) => {
    const base64Payload  = token?.split('.')[1]

    if(!base64Payload) {
      console.log('token is invaild')
      return;
    }

    const payload = Buffer.from(base64Payload , 'base64')
    const userData : UserData = JSON.parse(payload.toString())

    console.log('userData', userData);

    return {
      ...userData
    }
}

export async function userFromRequest(
    req: IncomingMessage & { cookies: NextApiRequestCookies }
  ): Promise<UserFromRequest | undefined> {
    const { token } = req.cookies;

    if (!token) return undefined;

    try {
      const user = decodeToken(token)
      if (!user) return undefined;

      return {user, token};
    } catch (error) {
      return undefined;
    }
}