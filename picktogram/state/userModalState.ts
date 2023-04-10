import { atom } from 'recoil';

export const userModalState = atom<boolean>({
    key: 'userModalState',
    default: false,
  });