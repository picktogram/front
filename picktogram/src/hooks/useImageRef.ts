import { useCallback, useEffect, useRef, useState } from "react";

export default function useImageRef () {
    const ref = useRef<any>(null)
    const [x, setX] = useState<number>(0)
    const [y, setY] = useState<number>(0)
    const [isOpen, setIsOpen] = useState<boolean>(false)

    useEffect(() => {
        window.addEventListener('resize', () => {
            setIsOpen(false)
        })
        return () => {
            window.removeEventListener('resize', () => {})
        }
    }, [setIsOpen])

    const handleClose = () => {
        setIsOpen(false)
    }

    const handlePosition = <T extends React.MouseEvent>(e : T) => {
        setX(e.nativeEvent.offsetX)
        setY(e.nativeEvent.offsetY)
        setIsOpen((prev) => !prev)
    }

    const handleSubmit = <T extends any>(onsubmit : (arg? : T) => void) => {
        onsubmit()
    }

    return {
        xPos : x,
        yPos : y,
        isOpen,
        ref,
        handlePosition,
        handleClose,
        handleSubmit,
    }
}