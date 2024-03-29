import { atom, selector } from "recoil";
import { decodeToken } from '@/util/decodeToken'
import { recoilPersist } from 'recoil-persist'

const sessionStorage =
      typeof window !== 'undefined' ? window.sessionStorage : undefined

const { persistAtom } = recoilPersist({
    key: 'persist-token',
    storage: sessionStorage,
  })

export const tokenState = atom<string | null>({
    key : 'tokenState',
    default : null,
    effects_UNSTABLE: [persistAtom],
})

export const myIdState = selector<number | null>({
    key : 'userId',
    get : ({get}) => {
        const token = get(tokenState)
        if(typeof token === 'string') {
            const userData = decodeToken(token)
            return userData?.id
        }
    }
})

export const tokenSelector = selector<string | null>({
    key : 'tokenSelector',
    get : ({get}) => {
        const token = get(tokenState);
        return token;
    },
    set : ({set}, newValue) => {
        if(typeof newValue === "string") {
            const newToken = newValue;
            set(tokenState, newToken);
        }
    }
})