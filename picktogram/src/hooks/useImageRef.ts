import { useCallback, useRef, useState } from "react";

export default function useImageRef () {
    const ref = useRef(null)
    const [x, setX] = useState<number>(0)
    const [y, setY] = useState<number>(0)

    const handlePosition = useCallback(<T extends React.MouseEvent>(e : T) => {
        if(!ref) return

        setX(e.pageX)
        setY(e.pageY)

    }, [ref])

    return {
        ref,
        handlePosition,
        xPos : x,
        yPos : y,
    }
}