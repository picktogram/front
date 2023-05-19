import React from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { UseFormSetValue } from 'react-hook-form';
import { RegisterData } from './modals/registerModal';
import styled from '@emotion/styled';

interface PostPopupButtonProps {
    setValue : UseFormSetValue<RegisterData>
}

const Button = styled.button`
    width: 100px;
    padding: 10px;
    border: none;
`

const PostPopupButton : React.FC<PostPopupButtonProps> = ({
    setValue
}) => {
    const open = useDaumPostcodePopup();

    const handleComplete = (data : any) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
            extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
            extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }

        // console.log(fullAddress);
        setValue('address', fullAddress)
    };

    const handleClick = () => {
        open({ onComplete: handleComplete });
    };


    return (
        <Button type='button' onClick={handleClick}>
            주소 입력
        </Button>
    );
};

export default PostPopupButton;