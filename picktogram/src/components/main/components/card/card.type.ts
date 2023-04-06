import { BoardData } from "@/src/components/main/Main.type"

export interface CardProps {
    isLast? : boolean
    newLimit : () => void
    data : BoardData
}