export type BoardData = {
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
