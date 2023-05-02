import React, {useEffect, useState} from 'react';
import Dropzone2 from '@/src/components/commons/dropzone2'
import styled from '@emotion/styled'

interface UserCoverImageProps {
    uploadImage : (data : any) => void;
    coverImage : string;
    isCurrentUser : boolean;
}

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 450px;
    background-color: black;
    color : white;
`

const ImageBox = styled.div<{
    background : string
}>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    background-image: url(${(props) => props.background ? props.background : ''});
    background-size: cover;
    display: ${(props) => props.background ? 'block' : 'none'};
`

const userCoverImage = ({
    uploadImage,
    coverImage,
    isCurrentUser,
} :
    UserCoverImageProps
) => {

    return (
        <Container>
            {
                isCurrentUser &&
                <Dropzone2
                    uploadImage={uploadImage}
                    label='이미지를 추가하세요.'
                />
            }
            <ImageBox background={coverImage ? coverImage : ''} />
        </Container>
    );
};

export default userCoverImage;