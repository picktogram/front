import React, { Dispatch, SetStateAction } from "react";
import Dropzone from 'react-dropzone'
import styled from "@emotion/styled";
import { useMutation } from 'react-query'
import axios from "axios";

const DropzoneBox = styled.div`
    width: 300px;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    margin: 16px;

    & p {
        font-size: 3rem;
        font-weight: 700;
    }
`

 const DropzoneComponent = ({
    setImage,
    token
 }: {
    setImage :Dispatch<SetStateAction<[]>>;
    token : string;
}) => {
    const {mutate : uploadImage, data, isSuccess} = useMutation<string[], Error>('uploadImage', async (data : any) => {
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
    } )
    const handleDrop = async (data : any[]) => {
        console.log(data);
        uploadImage(data[0]);

    }

    if(isSuccess) {
        console.log(data)
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