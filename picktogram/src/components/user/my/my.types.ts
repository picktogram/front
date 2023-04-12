export interface PropsWithToken {
    token : string;
}

export interface UserProfile {
    readonly id : number;
    name : string;
    nickname : string;
    email : string;
    birth?: string | null | undefined;
}
