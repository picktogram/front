import React from 'react';
import { mediaQuery } from '@/styles/media';
import { useRecoilState } from 'recoil';
import { registerModalState } from '@/state/registerModalState'
import { useForm } from 'react-hook-form'
import { SERVER_URL } from '@/util/constant'
import { toast } from 'react-hot-toast'
import { ErrorMessage } from '@hookform/error-message';

import styled from '@emotion/styled'
import * as Apis from 'picktogram-server-apis/api/functional';

import PostPopupButton from '../postPopupButton';
import Modal from '../Modal';

export interface RegisterData {
    name : string;
    nickname : string;
    email : string;
    password : string;
    phoneNumber : string;
    address : string;
    extraAddress? : string;
}

const RegisterForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    row-gap: 1rem;


    ${mediaQuery[3]} {
        justify-content: flex-start;
    }
`

const Names = styled.div`
    width: 100%;
    display: flex;
    column-gap: 1rem;
`

const Item = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap : .75rem;
`

const StyledErrorMessage = styled.div`
    color : #f14d4d;
`

const Email = styled.input`
    width: 100%;
    height: 50px;
    padding: 0.5rem;
    border: none;
    border-radius: 5px;
    &:focus {
        outline: none;
    }
`
const Name = styled(Email)``
const NickName = styled(Email)``
const Password = styled(Email)``
const PhoneNumber = styled(Email)``

const SubmitButton = styled.button`
    width: 150px;
    padding: 1rem;
    border: none;
`

const registerModal = () => {
    const [isRegisterOpen, setIsRegisterOpen] = useRecoilState(registerModalState)
    const { register, handleSubmit , reset, setValue, watch, formState : { errors }} = useForm<RegisterData>({criteriaMode : 'all'});
    const { address } = watch()

    const emailRegex =
            /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/

    const onClose = () => {
        reset()
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
                    phoneNumber : data.phoneNumber,
                    birth : 'string',
                    emailAdsConsent : false,
                    smsAdsConsent : false,
                    gender : true
                }
            )

            console.log(response)
            reset()
            onClose()
            toast.success('register success!')

        } catch (error) {
            console.log(error)
            toast.error('register failed')
        }
    }

    const bodyContent = (
        <RegisterForm
            onSubmit={handleSubmit((data) => onSumit(data))}
        >
            <Names>
                <Item>
                    이름 *
                    <Name
                        placeholder='Name'
                        {...register('name', {required : '이름을 입력해주세요.'})}
                    />
                    <StyledErrorMessage>
                        <ErrorMessage
                            errors={errors}
                            name='name'
                            render={({message}) => <p>{message}</p>}
                        />
                    </StyledErrorMessage>
                </Item>
                <Item>
                    별명 *
                    <NickName
                        placeholder='Nickname'
                        {...register('nickname', {required : '별명을 입력해주세요.'})}
                    />
                    <StyledErrorMessage>
                        <ErrorMessage
                            errors={errors}
                            name='nickname'
                            render={({message}) => <p>{message}</p>}
                        />
                    </StyledErrorMessage>
                </Item>
            </Names>
            <Item>
                이메일 *
                <Email
                    placeholder='you@example.com'
                    {...register('email', {
                        required : '이메일을 입력해주세요.', pattern : {
                        value: emailRegex,
                        message : '이메일 형식에 맞게 입력해주세요.'
                    }})}
                />
                <StyledErrorMessage>
                    <ErrorMessage
                        errors={errors}
                        name='email'
                        render={({messages}) =>
                            messages &&
                            Object.entries(messages).map(([type, message]) => (
                                <p key={type}>{message}</p>
                            ))
                        }
                    />
                </StyledErrorMessage>
            </Item>
            <Item>
                비밀번호 *
                <Password
                    placeholder='Password'
                    type='password'
                    {...register('password', {required : '비밀번호를 입력해주세요.'})}
                />
                <StyledErrorMessage>
                    <ErrorMessage
                            errors={errors}
                            name='password'
                            render={({message}) => <p>{message}</p>}
                    />
                </StyledErrorMessage>
            </Item>
            <Item>
                주소 *
                <PostPopupButton setValue={setValue}/>
                <Password
                    placeholder='주소'
                    {...register('address', {required : '주소를 입력해주세요.', value : address })}
                />
                <StyledErrorMessage>
                    <ErrorMessage
                            errors={errors}
                            name='address'
                            render={({message}) => <p>{message}</p>}
                    />
                </StyledErrorMessage>

            </Item>
            <Item>
                상세 주소
                <Password
                    placeholder='상세 주소'
                    {...register('extraAddress')}
                />
            </Item>
            <Item>
                전화번호 *
                <PhoneNumber
                placeholder='PhoneNumber'
                {...register('phoneNumber', {required : '전화번호를 입력해주세요.', minLength : {
                    value : 13,
                    message : '- 를 포함해 13자리를 입력해주세요.'
                }})}
                />
                <StyledErrorMessage>
                    <ErrorMessage
                            errors={errors}
                            name='phoneNumber'
                            render={({messages}) =>
                                messages &&
                                Object.entries(messages).map(([type, message]) => (
                                    <p key={type}>{message}</p>
                            ))
                        }
                    />
                </StyledErrorMessage>

            </Item>
            <SubmitButton type='submit'>
                회원가입
            </SubmitButton>
        </RegisterForm>
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