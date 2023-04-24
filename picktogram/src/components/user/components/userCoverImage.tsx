import React, {useEffect, useState} from 'react';
import Dropzone2 from '@/src/components/commons/layout/dropzone2'
import styled from '@emotion/styled'


interface UserCoverImageProps {
    uploadImage : (data : any) => void;
    coverImage : string[];
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
    coverImage
} :
    UserCoverImageProps
) => {
    const [image, setImage] = useState<string | null>(null)

    useEffect(() => {
        if(coverImage.length) {
            setImage(coverImage[0])
        }
    }, [coverImage])

    return (
        <Container>
             <Dropzone2
                images={coverImage}
                uploadImage={uploadImage}
                label='이미지를 추가하세요.'
            />
            <ImageBox background={image ? image : ''} />
        </Container>
    );
};

export default userCoverImage;