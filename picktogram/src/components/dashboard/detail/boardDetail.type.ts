type ImageData = {
    id : number;
    depth : 1;
    position : number;
    url : string;
}

export interface ICommentBodyData {
    contents : string;
    parentId? : number | null | undefined
    xPosition? : number | `${number}` | null | undefined;
    yPosition? : number | `${number}` | null | undefined;
    imageId? : number;
}

export type ICommentSubmitData = ICommentBodyData & {
    onSuccess? : () => void
}

export interface IDetailResponce  {
    id: number;
    contents: string;
    images: ImageData[];
    writer : {
        id : number,
        nickname : string ,
        profileImage : string
    };
}

export interface ICommentData  {
    list : {
        xPosition : string;
        yPosition : string;
        id : number;
        writerId : number;
        contents : string;
    }[];
    count : number;
    totalResult : number;
    totalPage : number;
    page : number;
}

export type ICommentSelectData = Omit<ICommentData, 'count' | 'totalResult'> & { hasMore : boolean }

export interface IBoardDetailProps {
    token : string;
    user : {
        nickname : string
    }
}

export interface BoardDetailUIProps {
    boardData : any;
    commentsData :  ICommentSelectData | undefined;
    page : number;
    setPage :  React.Dispatch<React.SetStateAction<number>>;
    handleMoveEdit : React.MouseEventHandler<HTMLButtonElement>;
    handleComment : (arg : ICommentSubmitData) => void;
}

export interface InputRemoteControlProps {
    isOpen : boolean;
    xPos : number;
    yPos : number;
    currentId : number;
    handleClose : () => void;
    handleComment : (arg : ICommentSubmitData) => void;
}