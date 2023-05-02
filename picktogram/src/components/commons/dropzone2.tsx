import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone'

interface DropzoneProps {
    uploadImage : (args? : any) => void;
    label : string;
}

const Dropzone2 : React.FC<DropzoneProps>= ({
    uploadImage,
    label
}) => {

    const onDrop = useCallback((acceptedFiles : any) => {
        uploadImage(acceptedFiles[0])
    }, [uploadImage])

    const { getInputProps, getRootProps } = useDropzone({onDrop})

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} style={{
                position : 'absolute',
                right : '0',
                top : '0',
                zIndex : '10'
            }}/>
        </div>
    );
};

export default Dropzone2;