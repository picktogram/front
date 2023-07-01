import React, { useState } from 'react';
import { InputRemoteControlProps } from '../boardDetail.type'

import * as S from '../boardDetail.styles'

const InputRemoteControl : React.FC<InputRemoteControlProps>= ({
    isOpen,
    currentId,
    handleClose,
    handleComment,
    xPos,
    yPos
}) => {
    const [modalInputValue, setModalInputValue] = useState<string>('')

    if(!isOpen) {
        return null
    }

    return (
        <S.RemoteControl
            xPos={xPos}
            yPos={yPos}
            onClick={(e) => e.stopPropagation()}
        >
            <S.Input
                type="text"
                placeholder="댓글을 입력해주세요."
                value={modalInputValue}
                onChange={(e) => setModalInputValue(e.target.value)}
            />
            <S.RemoteCancelBtn onClick={handleClose}>x</S.RemoteCancelBtn>
            <S.Button onClick={() => handleComment({
                parentId : null,
                contents : modalInputValue,
                xPosition : xPos ? xPos : null,
                yPosition : yPos ? yPos : null,
                imageId : currentId,
                onSuccess: () => {
                    setModalInputValue('')
                    handleClose()
                }
            })}
            disabled={!modalInputValue}
            >등록</S.Button>
        </S.RemoteControl>
    );
};

export default InputRemoteControl;