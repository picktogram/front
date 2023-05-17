import React, { useState , useCallback, useEffect} from 'react';
import { isBusinessErrorGuard } from 'picktogram-server-apis/config/errors';
import { SERVER_URL } from '@/util/constant';

import * as Apis from 'picktogram-server-apis/api/functional';
import styled from '@emotion/styled';

import Modal from '../Modal';
import useCurrentUser from '@/src/hooks/useCurrentUser';
import ImageUpload from '../ImageUpload';

type UserIntroduceModalProps = {
    token : string;
    isOpen : boolean;
    setIsOpen : React.Dispatch<React.SetStateAction<boolean>>;
    refetchUser : any;
}

const UploadForm = styled.form`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    justify-content: center;
`

const UploadButton = styled.button`
    width: 100px;
    padding: 1rem;
    color : white;
    background-color: dodgerblue;
    border: 1px solid lightgray;
    border-radius: 20px;
`

const Input = styled.input`
    width: 100%;
    padding: 20px;
`

const UserProfileModal = ({
    token,
    isOpen,
    setIsOpen,
    refetchUser
} :
    UserIntroduceModalProps
) => {
    const currnetUser = useCurrentUser(token)
    const [introduce, setIntroduce] = useState<string | undefined | null>('')
    const [profileImage, setProfileImage] = useState<string | undefined | null>('')
    const [coverImage, setCoverImage] = useState<string | undefined | null>('')


    useEffect(() => {
        setIntroduce(currnetUser?.introduce)
        setProfileImage(currnetUser?.profileImage)
        setCoverImage(currnetUser?.coverImage)
    }, [currnetUser?.introduce, currnetUser?.profileImage, currnetUser?.coverImage])


    const updateProfile = useCallback(async () => {
        try {
            const response = await Apis.api.v1.users.profile.updateProfile({
                host : String(SERVER_URL),
                headers : {
                    Authorization : token
                }
            }, {
                introduce,
                coverImage,
                profileImage
            })

            if(isBusinessErrorGuard(response)) {
                return;
            }
            return response.data
        } catch (error) {
            throw error
        }
    },[token, introduce, Apis, isBusinessErrorGuard, coverImage, profileImage])

    const onSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        updateProfile()
        refetchUser()
        setIsOpen(false)
    }

    const onClose = () => {
        setIsOpen(false)
    }

    const bodyContents = (
        <UploadForm onSubmit={(e) => onSubmit(e)}>
            <ImageUpload
                token={token}
                title='Profile Image'
                value={profileImage ? profileImage : undefined}
                label='Upload profile image'
                onChange={(image) => setProfileImage(image)}
            />
            <ImageUpload
                token={token}
                title='Cover Image'
                value={coverImage ? coverImage : undefined}
                label='Upload cover image'
                onChange={(image) => setCoverImage(image)}
            />
            <label>Introduce</label>
            <Input
                onChange={(e) => setIntroduce(e.currentTarget.value)}
                value={introduce ? introduce : ''}
            />
            <UploadButton>완료</UploadButton>
        </UploadForm>
    )
    return (
        <div>
            <Modal
                onClose={onClose}
                isOpen={isOpen}
                body={bodyContents}
                title='Edit your Profile'
                label='Edit your Profile'
            />
        </div>
    );
};

export default UserProfileModal;