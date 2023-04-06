import React from 'react'
import { ErrorMessage } from '@hookform/error-message';
import { FieldErrorsImpl, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { LoginData } from './Login.type';
import Link from 'next/dist/client/link'
import * as S from "./Login.styles"

export default function LoginUI({
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting
} : {
    register : UseFormRegister<LoginData>;
    handleSubmit : UseFormHandleSubmit<LoginData>;
    onSubmit : (data: LoginData) => void;
    errors : Partial<FieldErrorsImpl<{
        email: string;
        password: string;
    }>>;
    isSubmitting : boolean;
}) {
  return (
    <S.LoginPageContainer>
        <S.About>
            <h1>Welcome to Picktogram</h1>
            <div>
                Picktogram is SNS for designer
            </div>
        </S.About>
        <S.Form onSubmit={handleSubmit(({email, password}) => onSubmit({email, password}))}>
            <h2>Login</h2>
            <S.InputWrapper >
                <S.Email type='text' {...register('email', {required : "This is required"})} placeholder="Email" />
                <ErrorMessage
                errors={errors}
                name="email"
                render={({ message }) => <p>{message}</p>}
                />
            </S.InputWrapper>
            <S.InputWrapper >
                <S.Password type='password'
                {...register('password',
                    {required : "This is required" ,
                    minLength: { value: 3, message: "This input min-width is 8" }})}
                    placeholder="Password"
                />
                <ErrorMessage
                  errors={errors}
                  name="password"
                  render={({ messages }) =>
                  messages &&
                  Object.entries(messages).map(([type, message]) => (
                    <p key={type}>{message}</p>
                  ))
                }
                />
            </S.InputWrapper>
            <button type='submit' disabled={isSubmitting}>login</button>
            <S.LoginMenu>
                <Link href="##">Forget Password?</Link>
                <Link href="##">Sign Up</Link>
            </S.LoginMenu>
        </S.Form>
    </S.LoginPageContainer>
  )
}
