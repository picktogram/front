import {atom, selectorFamily} from "recoil"

export const scrollState = atom<Map<string, number>>({
    key : 'scrollState',
    default : new Map(),
});

export const scrollSelector = selectorFamily<number | undefined, string>({
    key : 'scrollSelector',
    get :
        (url) =>
        ({get}) => {
            const scrollStateMap = get(scrollState);
            const pos = scrollStateMap.get(url);
            return pos;
        },
    set :
        (url) =>
        ({get ,set}, newValue) => {
            if(typeof newValue == 'number') {
                const newState = new Map([...get(scrollState)])
                newState.set(url, newValue);
                set(scrollState, newState);
            }
        }
})