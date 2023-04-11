import React from 'react';
import Modal from '../Modal';
import styled from '@emotion/styled'
import * as Apis from 'picktogram-server-apis/api/functional';
import { useRecoilState } from 'recoil';
import { registerModalState } from '@/state/registerModalState'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message';
import { SERVER_URL } from '@/util/constant'
import {toast} from 'react-hot-toast'

interface RegisterData {
    name : string;
    nickname : string;
    email : string;
    password : string;
}

const Email = styled.input`
    width: 75%;
    height: 50px;
    padding: 0.5rem;

    &:focus {
        outline: none;
    }
`
const Name = styled(Email)``
const NickName = styled(Email)``
const Password = styled(Email)``

const SubmitButton = styled.button`
    width: 150px;
    padding: 1rem;
    border: none;
`

const registerModal = () => {
    const [isRegisterOpen, setIsRegisterOpen] = useRecoilState(registerModalState)
    const { register, handleSubmit } = useForm<RegisterData>({criteriaMode : 'all'});

    const onClose = () => {
        setIsRegisterOpen(false)
    }

    const onSumit = async (data : RegisterData) => {
        // TO DO SUBMIT
        try {
            const response = await Apis.api.v1.auth.sign_up.signUp({
                host : String(SERVER_URL),
                headers : {

                    }
                }, {
                    name : data.name,
                    email : data.email,
                    nickname : data.nickname,
                    password : data.password,
                    phoneNumber : '',
                    birth : '',
                    emailAdsConsent : false,
                    smsAdsConsent : false,
                    gender : true
                }
            )

            console.log(response)
            onClose()
            toast.success('register success!')

        } catch (error) {
            console.log(error)
            toast.error('register failed')
        }
    }

    const bodyContent = (
        <form
            style={{
                display : 'flex',
                flexDirection : 'column',
                alignItems : 'center',
                gap : '1rem'
            }}
            onSubmit={handleSubmit((data) => onSumit(data))}
        >
            <Name
                placeholder='Name'
                {...register('name', {required : '이름을 입력해주세요.'})}
            />
            <NickName
                placeholder='Nickname'
                {...register('nickname', {required : '닉네임을 입력해주세요.'})}
            />
             <Email
                placeholder='Email'
                {...register('email', {required : '이메일을 입력해주세요.'})}
            />
            <Password
                placeholder='Password'
                type='password'
                {...register('password', {required : '비밀번호를 입력해주세요.'})}
            />
            <SubmitButton type='submit'>
                Sign Up
            </SubmitButton>

        </form>
    )

    return (
        <Modal
            isOpen={isRegisterOpen}
            label='Sign Up'
            title='Sign Up'
            onClose={onClose}
            body={bodyContent}
        />
    );
};

export default registerModal;