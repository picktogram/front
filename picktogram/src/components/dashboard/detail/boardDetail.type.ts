import { UseMutateFunction } from "react-query";

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

export interface BoardDetailProps {
    token : string;
    user : {
        nickname : string
    }
}

export interface BoardDetailUIProps {
    boardData : any;
    handleMoveEdit : React.MouseEventHandler<HTMLButtonElement>;
    addComments : UseMutateFunction<any, unknown, any, unknown>;
    commentsData :  {
        list : {
            xPosition : string;
            yPosition : string;
            id : number;
            writerId : number;
            contents : string;
        }[];
        page : number;
        totalPage : number;
        hasMore : boolean;
    } | undefined;
    setPage :  React.Dispatch<React.SetStateAction<number>>;
    page : number
    isNewComments : boolean;
    handleNewComments : any;
}