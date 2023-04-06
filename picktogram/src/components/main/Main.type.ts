export type BoardData = {
    id : number;
    contents : string;
    createdAt : any;
    isMine : boolean;
    writerId : number;
    nickname : string;
    profileImage : string;
    commentMetadata : {
        id : number;
        contents : string;
    }[];
    followStatus : 'follow' | 'unfollow';
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
