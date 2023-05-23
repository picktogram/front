import { SetStateAction } from "react";
import { BoardData } from "@/src/components/main/Main.type"

export interface CardProps {
    isLast? : boolean;
    newLimit : () => void;
    data : BoardData;
    setShowArticle? : React.Dispatch<SetStateAction<boolean>>;
    showArticle? : boolean;
    token : string;
}