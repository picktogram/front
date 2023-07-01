import { UserType } from "picktogram-server-apis/types";

export interface CreateBoardProps {
    token : string;
    isEdit? : boolean;
    defaultData? : any;
}

export interface CreateBoardUIProps {
    token : string;
    images : string[];
    setImages : React.Dispatch<React.SetStateAction<string[]>>;
    count : number;
    setCount : React.Dispatch<React.SetStateAction<number>>;
    setContents : React.Dispatch<React.SetStateAction<string>>;
    currentUser : UserType.DetailProfile | null;
    handleSubmit : React.FormEventHandler<HTMLFormElement>;
    handleEditSubmit : React.FormEventHandler<HTMLFormElement>;
    isEdit? : boolean;
    defaultData? : any;
    handelDelelte : (value : string) => void;
}