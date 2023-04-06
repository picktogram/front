type ImageData = {
    id : number;
    depth : 1;
    position : number;
    url : string;
}

export  type DetailResponce = {
    id: number;
    contents: string;
    images: ImageData[];
    writer : {
        id : number,
        nickname : string ,
        profileImage : string
    };
}