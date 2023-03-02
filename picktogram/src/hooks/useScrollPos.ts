import {useRouter} from "next/router";
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {scrollState, scrollSelector} from "@/state/scrollState"

function useScrollPos () {
    const isServer = typeof window === undefined;
    const {pathname, beforePopState} = useRouter();
    const setScrollValue = useSetRecoilState(scrollSelector(pathname));
    const scrollValue = useRecoilValue(scrollState);

    const savePos = () => {
        if(isServer) return;
        let pageYoffset = window.pageYOffset;

        if(pageYoffset > 0) {
            setScrollValue(pageYoffset);
        } else {
            setScrollValue(0);
        }

        console.log(beforePopState)
    }

    const loadPos = () => {
        if(isServer) return;

        if(scrollValue.size) {
            console.log(scrollValue.get(pathname));
            window.scrollTo(0, Number(scrollValue.get(pathname)));
        }
    }

    return {savePos, loadPos}
}


export default useScrollPos;