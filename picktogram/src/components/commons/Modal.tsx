import React, { useCallback, useEffect, useRef } from 'react'
import { mediaQuery } from '@/styles/media';
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
    width: 80%;
    height: 80%;
    background-color: #242526;
    border-radius: 20px;
    padding: 20px;
    color : white;
    display: flex;
    flex-direction: column;

    ${mediaQuery[3]} {
        width: 1200px;
        height: auto;
        max-height: 1500px;
    }

`

const CloseButton = styled.button`
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid lightgray;
    border-radius: 50%;
    color : black;
    font-size: 1.2rem;
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

    useEffect(() => {
        const html = document.documentElement;
        if (isOpen) {
        html.style.overflowY = 'hidden';
        } else {
        html.style.overflowY = 'auto';
        }
        return () => {
        html.style.overflowY = 'auto';
        };
    }, [isOpen])

    if(!isOpen) {
        return null
    }

    return (
        <ModalContainer>
            <ModalContents ref={ref}>
                <ModalHeader>
                    <h2>{title}</h2>
                    <CloseButton onClick={handleClose}>
                         <i className="ri-close-line"></i>
                    </CloseButton>
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