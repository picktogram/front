import React, { Dispatch, SetStateAction } from "react";
import Dropzone from 'react-dropzone'
import styled from "@emotion/styled";
import { useMutation } from 'react-query'
import axios from "axios";
import { SERVER_URL } from "@/util/constant";

export default function DropzoneComponent ({
    setCount,
    images,
    setImages,
    token
 }: {
    setCount : Dispatch<SetStateAction<number>>;
    images : string[];
    setImages : Dispatch<SetStateAction<string[]>>;
    token : string;
})  {
    const {mutate : uploadImage} = useMutation<string[], Error>('uploadImage', async (data : any) => {
        try {
            let formData = new FormData();
            formData.append('file', data);

            const responce = await axios.post(`${SERVER_URL}/api/v1/body-image`,
            formData,
          {
            headers : {
              'Authorization' : token,
              'Content-Type': 'multipart/form-data',
            }
          }
        );

        const result = await responce.data.data;
        return result;
        } catch (err) {
            console.error(err)
        }
    }, {
        onSuccess : (data) => {
            let newImages = [...images, ...data]
            setImages(newImages);
            setCount(images.length);
        }
    })

    const handleDrop = async (data : any[]) => {
        uploadImage(data[0]);
    }


    return (
        <DropzoneBox>
            <Dropzone onDrop={acceptedFiles => handleDrop(acceptedFiles)}>
            {({getRootProps, getInputProps}) => (
                <div>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Icon>
                            <ImageIcon className="ri-image-fill"></ImageIcon>
                        </Icon>
                    </div>
                </div>
            )}
            </Dropzone>
        </DropzoneBox>
    )
}

const DropzoneBox = styled.div`
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;

    & p {
        font-size: 1.5rem;
        font-weight: 600;
    }
`

const Icon = styled.p`
    width: 50px;
    height: 50px;
    background-color: dodgerblue;
    border : none;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ImageIcon = styled.i`
    color : white;
`