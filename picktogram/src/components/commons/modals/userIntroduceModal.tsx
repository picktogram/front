import React, { useState } from 'react';
import Modal from '../Modal';

type UserIntroduceModalProps = {
    setIntroduce : React.Dispatch<React.SetStateAction<string>>;
    isOpen : boolean;
    setIsOpen : React.Dispatch<React.SetStateAction<boolean>>;
    onSubmit : () => void;
}

const UserIntroduceModal = ({
    setIntroduce,
    isOpen,
    setIsOpen,
    onSubmit
} :
    UserIntroduceModalProps
) => {
    // const [isOpen, setIsOpen] = useState<boolean>(false)

    const onClose = () => {
        setIsOpen(false)
    }

    const bodyContents = (
        <form onSubmit={onSubmit}>
            <input
                onChange={(e) => setIntroduce(e.currentTarget.value)}
            />
        </form>
    )
    return (
        <div>
            <Modal
                onClose={onClose}
                isOpen={isOpen}
                body={bodyContents}
                title='Introduce'
                label='Introduce'
            />
        </div>
    );
};

export default UserIntroduceModal;