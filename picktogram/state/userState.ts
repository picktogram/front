import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

type UserState = {
    nickname : string;
}

const sessionStorage =
      typeof window !== 'undefined' ? window.sessionStorage : undefined

const { persistAtom } = recoilPersist({
    key: 'persist-user',
    storage: sessionStorage,
})

export const userState = atom<UserState | null>({
    key : 'userNameState',
    default : null,
    effects_UNSTABLE: [persistAtom],
})

