import React, { Dispatch, SetStateAction } from "react";
import Dropzone from 'react-dropzone'
import styled from "@emotion/styled";
import { useMutation } from 'react-query'
import axios from "axios";
import useServerRefresher from "@/src/hooks/useServerRefresher";

const DropzoneBox = styled.div`
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;

    & p {
        font-size: 1.5rem;
        font-weight: 600;
    }
`

 const DropzoneComponent = ({
    setCount,
    images,
    setImages,
    token
 }: {
    setCount : Dispatch<SetStateAction<number>>;
    images : string[];
    setImages : Dispatch<SetStateAction<[]>>;
    token : string;
}) => {
    const {mutate : uploadImage} = useMutation<string[], Error>('uploadImage', async (data : any) => {
        try {
            let formData = new FormData();
            formData.append('file', data);

            const responce = await axios.post("http://13.209.193.45:3000/api/v1/body-image",
            formData,
          {
            headers : {
              'Authorization' : `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            }
          }
        );
        console.log(responce)
        const result = await responce.data.data;
        return result;
        } catch (err) {
            console.error(err)
        }
    }, {
        onSuccess : (data) => {
            setImages((prev) => [...prev, data]);
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
                <section>
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>+</p>
                </div>
                </section>
            )}
            </Dropzone>
        </DropzoneBox>
    )
}


export default DropzoneComponent