import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'
import { UserData } from '@/src/auth/tokens'


const sessionStorage =
      typeof window !== 'undefined' ? window.sessionStorage : undefined

const { persistAtom } = recoilPersist({
    key: 'persist-user',
    storage: sessionStorage,
})

export const userState = atom<UserData | null>({
    key : 'userNameState',
    default : null,
    effects_UNSTABLE: [persistAtom],
})

