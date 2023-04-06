import {atom, DefaultValue, selector} from "recoil"

type BoardData = {
    contents : string;
    images? : string[]
}

export const boardContents = atom<string>({
    key : 'boardContents',
    default : ""
})

export const boardImages = atom<string[] | undefined>({
    key : 'boardImages',
    default : [],
})

export const boardBeforeSave = selector<BoardData>({
     key : "boardCreateSeletor",
     get : ({get}) => {
        const contents = get(boardContents);
        const images = get(boardImages);

        const boardData = {
            contents,
            images,
        }
        return boardData
     },
     set : ({set}, newValue) => {
        const isDefault = newValue instanceof DefaultValue

        if(!isDefault) {
            set(boardContents, newValue.contents);
            set(boardImages, newValue.images);
        }
     },
})