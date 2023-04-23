import React, { useCallback, useEffect, useRef } from 'react'
import styled from '@emotion/styled';

interface ModalProps {
    isOpen? : boolean;
    body ? : React.ReactElement;
    footer ? : React.ReactElement;
    title : string;
    onClose : () => void;
    label : string;
}

const ModalContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-x:  hidden;
    overflow-y: auto;
    position: fixed;
    inset: 0;
    z-index: 50;
    outline: none;
    background-color: rgba(0,0,0,0.7);
`

const ModalContents = styled.div`
    width: 50%;
    height: auto;
    background-color: black;
    border-radius: 20px;
    padding: 20px;
    color : white;
    display: flex;
    flex-direction: column;

`

const ModalHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
`

const ModalBody = styled.div`
    padding: 10px;
`

const ModalFooter = styled.div`
    padding: 10px;
`

const Modal : React.FC<ModalProps> = ({
    label,
    onClose,
    title,
    body,
    footer,
    isOpen,
}) => {
    const ref = useRef<any>(null)
    const handleClose = useCallback(() => {
        onClose()
    }, [onClose])

    useEffect(() => {
        const listener = (e : any) => {
            if(!ref.current || ref.current.contains(e.target))  {
                return;
            }
            handleClose()
        };
        document.addEventListener("mousedown", listener)
        document.addEventListener("touchstart", listener)
        return () => {
            document.removeEventListener("mousedown", listener)
            document.removeEventListener("touchstart", listener)
        }
    }, [])

    if(!isOpen) {
        return null
    }

    return (
        <ModalContainer>
            <ModalContents ref={ref}>
                <ModalHeader>
                    <h3>{title}</h3>
                    <button onClick={handleClose}>
                         <i className="ri-close-line"></i>
                    </button>
                </ModalHeader>
                <ModalBody>
                    {body}
                </ModalBody>
                <ModalFooter>
                    {footer}
                </ModalFooter>
            </ModalContents>
        </ModalContainer>
    );
};

export default Modal;