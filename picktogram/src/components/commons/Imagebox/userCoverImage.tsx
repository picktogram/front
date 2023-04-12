import React, {useCallback, useState} from 'react';
import Dropzone from '@/src/components/commons/dropzone'
import styled from '@emotion/styled'

import { useDropzone } from 'react-dropzone'

const Container = styled.div`
    width: 100%;
    height: 450px;
    background-color: black;
    color : white;
    border-radius: 20px;
    cursor: pointer;
`

const userCoverImage = () => {
    const [coverImage, setCoverImage] = useState<string[]>([])
    const onDrop = useCallback((acceptedFiles : any) => {
        console.log(acceptedFiles)

        if(coverImage.length) {
            return ;
        }

        //TODO IMAGE UPLOAD TO SERVER
        setCoverImage(acceptedFiles[0])
      }, [setCoverImage, coverImage])

    const {getRootProps, getInputProps, isDragActive, } = useDropzone({onDrop})
    return (

        <Container {...getRootProps()}>
                <input {...getInputProps()} style={{zIndex : '100'}}/>
                    {/* {
                    isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    } */}

        </Container>
    );
};

export default userCoverImage;