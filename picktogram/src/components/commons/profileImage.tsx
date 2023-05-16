import React from 'react';
import styled from '@emotion/styled';

type ProfileImageProps = {
    width? : number;
    height? : number;
    profileImage? : string | null;
    isCircle? : boolean
}

const BasicProfileImage = styled.div<ProfileImageProps>`
    width: ${(props) => props.width ? `${props.width}` : '50px'};
    height : ${(props) => props.height ? `${props.height}` : '50px'};
    background-image : url(${(props) => props.profileImage ? props.profileImage : '/images/placeholder.png'});
    background-repeat : no-repeat;
    background-size : cover;
    border : 1px solid lightgray;
    border-radius : ${(props) => props.isCircle ? '50%' : ''};
`

const ProfileImage : React.FC<ProfileImageProps> = ({
    width,
    height,
    profileImage,
    isCircle
}) => {
    return (
        <BasicProfileImage
            width={width}
            height={height}
            profileImage={profileImage}
            isCircle={isCircle}
        />
    );
};

export default ProfileImage;