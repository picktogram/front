import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import Image from 'next/image'
import styled from '@emotion/styled'
import useImageUpload from '@/src/hooks/useImageUpload';

interface ImageUploadProps {
    token : string;
    title? : string;
    onChange : (image : string) => void;
    value ? : string;
    label : string;
}

const ImageInput = styled.div`
    position: relative;
    width: 100%;
    padding: 20px;
    display: flex;
    justify-content: cetner;
    align-items: center;
    border: 1px dotted white;
`

const Label = styled.p`
    color : white;
`

const RemoveButton = styled.button`
    position: absolute;
    right: 1rem;
    width: 25px;
    height: 25px;
    border: none;
    border-radius: 50%;
    background-color: white;
    color : black;
    cursor: pointer;
    z-index: 10000;
`

const ImageUpload : React.FC<ImageUploadProps> = ({
    token,
    title,
    label,
    value,
    onChange,
}) => {
    const [image, setImage] = useState(value)
    const {mutate : uploadImageOnSever} = useImageUpload('uploadImageOnServer', token, (data) => {
        if(data) {
            console.log(data[0])
            onChange(data[0])
            setImage(data[0])
        }
    }) // 서버에 이미지를 업로드하고 그 주소를 받아온다.

    const onDrop = useCallback((acceptedFiles : any) => {
        uploadImageOnSever(acceptedFiles[0])
    }, [uploadImageOnSever])

    const onRemove = useCallback(() => {
        onChange('')
        setImage('')
    }, [setImage, onChange])

    const { getInputProps, getRootProps } = useDropzone({
        maxFiles : 1,
        onDrop,
        accept : {
            'image/jpeg' : [],
            'image/png' : []
        }
    })

    return (
        <>
            {title ? title : null}
            <ImageInput {...getRootProps()}>
                <input {...getInputProps()}/>
                {
                    image ? (
                        <div>
                            {/* <Image
                                src={image}
                                height={100}
                                width={100}
                                alt='Uploaded Image'
                            /> */}
                            {image}
                        </div>
                    ) : (
                        <Label>{label}</Label>
                    )
                }
                <RemoveButton onClick={onRemove}>X</RemoveButton>
            </ImageInput>
        </>

    );
};

export default ImageUpload;