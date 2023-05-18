import React, { useCallback } from 'react';
import styled from '@emotion/styled';

type ProfileImageProps = {
    width? : number;
    height? : number;
    profileImage? : string | null;
    isCircle? : boolean;
    onClick? : () => void;
}

const BasicProfileImage = styled.div<ProfileImageProps>`
    position: relative;
    width: ${(props) => props.width ? `${props.width}px` : '50px'};
    height : ${(props) => props.height ? `${props.height}px` : '50px'};
    background-image : url(${(props) => props.profileImage ? props.profileImage : '/images/placeholder.png'});
    background-repeat : no-repeat;
    background-size : cover;
    border : 1px solid lightgray;
    border-radius : ${(props) => props.isCircle ? '50%' : ''};

    &:hover {
    &::after {
      position: absolute;
      content: '';
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: rgba(0,0,0,0.4);
    }
  }
`

const ProfileImage : React.FC<ProfileImageProps> = ({
    width,
    height,
    profileImage,
    isCircle,
    onClick
}) => {
    const handleClick = useCallback(() => {
        if(onClick) {
            onClick()
        }
    }, [onClick])

    return (
        <BasicProfileImage
            width={width}
            height={height}
            profileImage={profileImage}
            isCircle={isCircle}
            onClick={handleClick}
        />
    );
};

export default ProfileImage;