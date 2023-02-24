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

export type ResponceData = {
    list : BoardData[];
    totalResult : number;
    totalPage : number;
    search : null;
    page : number
}

export type Responce = {
    result : boolean;
    code : number;
    requestToResponse : string;
    data : ResponceData
}
