import { Followees } from "@/src/hooks/useFollowees";
import { InfiniteArticle } from "@/src/hooks/useInfiniteArticle";
import { UserBridgeType } from "picktogram-server-apis/types";
import { InfiniteData } from "react-query";

export interface PropsWithToken {
    token : string;
}

export interface UserProfile {
    followStatus: UserBridgeType.FollowStatus;
    mySelf? : boolean | undefined;
    readonly id : number;
    name : string;
    nickname : string;
    email : string;
    birth? : string | null | undefined;
    introduce? : string | null | undefined;
    profileImage? : string | null | undefined;
    coverImage? : string | null | undefined;
}

export interface UserBoards {
    list :
        {
          id : number;
          contents : string;
          isMine: boolean
          writer : string
          conments : string[]
        }[];
      count : number;
      totalResult : number;
      totalPage : number;
      search : string;
      page : number;
}

export interface UserPageUIProps {
    user : UserProfile | null;
    refetchUser : any;
    myBoard : InfiniteData<InfiniteArticle> | null | undefined;
    // myBoard : UserBoards | null
    setIntroduce : React.Dispatch<React.SetStateAction<string>>;
    addIntroduce : () => void;
    setIsOpen : React.Dispatch<React.SetStateAction<boolean>>;
    coverImage : string;
    setCoverImage : React.Dispatch<React.SetStateAction<string[]>>;
    uploadImage : (data : any) => void;
    handleNextPage : () => void;
    followees : Followees | null;
    token : string;
}

export interface UserFolloweesProps {
    token : string;
}