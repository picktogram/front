import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled'

interface UserCoverImageProps {
    coverImage : string | null | undefined;
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
    coverImage,
} :
    UserCoverImageProps
) => {

    return (
        <Container>
            <ImageBox background={coverImage ? coverImage : ''} />
        </Container>
    );
};

export default userCoverImage;