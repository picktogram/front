import { atom } from 'recoil';

export const searchBarState = atom<boolean>({
    key: 'searchBarState',
    default: false,
  });