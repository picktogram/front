// 로그인 시 보낼 데이터 타입
export interface LoginData {
    email : string
    password : string
}

// Context에 저장할 유저 정보 타입
export interface UserInfo {
    user : { nickname : string }
    setUser : ( user: { nickname : string } | undefined ) => void
}


export interface Board {
    comments : string[];
    contents : string;
    createAt : string;
    id : number;
    isMine : boolean;
    writer : {
        id : number;
        nickname : string;
        profileImage : string;
    }
}

export interface CardProps {
      isLast? : boolean
      newLimit : () => void
      data : Board
}