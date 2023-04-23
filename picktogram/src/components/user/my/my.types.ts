export interface PropsWithToken {
    token : string;
}

export interface UserProfile {
    readonly id : number;
    name : string;
    nickname : string;
    email : string;
    birth?: string | null | undefined;
    introduce? : string | null
}

export interface MyPageUIProps {
    user : UserProfile | null;
    myBoard : any[];
    setIntroduce : React.Dispatch<React.SetStateAction<string>>;
    addIntroduce : () => void;
    setIsOpen : React.Dispatch<React.SetStateAction<boolean>>;
}