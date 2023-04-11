import { atom } from 'recoil'

export const registerModalState = atom<boolean>({
    key : 'registerModalState',
    default : false
})