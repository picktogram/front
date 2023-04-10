export type BoardData = {
    id : number;
    contents : string;
    createdAt : string;
    isMine : boolean;
    comments : {
        id : number;
        contents : string;
        articleId : number;
        position : number;
    }[];
    writer : {
        id : number;
        nickname : string;
        profileImage : string | null
        followStatus : 'followUp' | 'noting';
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
