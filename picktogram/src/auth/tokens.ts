import { IncomingMessage } from 'http';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';

// 사용자 인증을 위해 token을 쿠키에 저장
export function authenticateUser( token : string ): void {
    document.cookie = `token=${token};max-age=3600`;
}

// 서용자 로그아웃을 위해 쿠키에 토큰을 삭제
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
    const userData = JSON.parse(payload.toString())

    console.log(userData)

    return { nickname : userData.nickname }
}

export async function userFromRequest(
    req: IncomingMessage & { cookies: NextApiRequestCookies }
  ): Promise<any> {
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