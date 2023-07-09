import { PaginationResponseType } from "picktogram-server-apis/common/interceptors/transform.interceptor";
import { ArticleType, CommentType, Merge, UserType } from "picktogram-server-apis/types";
import { InfiniteData } from "react-query";

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

export type ICommentData = Merge<CommentType.RootComment, {
    writer: UserType.Profile;
}>[]

export interface ICommentSelectData {
    list: Merge<CommentType.RootComment, {
        writer: UserType.Profile;
    }>[];
    page: number;
    totalPage: number;
    hasMore: boolean;
}

export interface IBoardDetailProps {
    token : string;
    user : {
        nickname : string
    }
}

//
export interface BoardDetailUIProps {
    boardData : ArticleType.DetailArticle | null | undefined;
    commentsData :  InfiniteData<PaginationResponseType<CommentType.CommentsByArcile> | undefined> | undefined;
    ishasNextComments : boolean | undefined;
    handleMoveEdit : React.MouseEventHandler<HTMLButtonElement>;
    handleComment : (arg : ICommentSubmitData) => void;
    handleNextCommentData : () => void;
}

export interface InputRemoteControlProps {
    isOpen : boolean;
    xPos : number;
    yPos : number;
    currentId : number;
    handleClose : () => void;
    handleComment : (arg : ICommentSubmitData) => void;
}

export interface CommentModalProps {
    commentsData : InfiniteData<PaginationResponseType<CommentType.CommentsByArcile> | undefined> | undefined;
    currentId : number;
    hoverInfo : {
        id : string;
        isHover : boolean;
    };
}