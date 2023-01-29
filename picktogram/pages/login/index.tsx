import React, { useContext } from 'react'
import {userInfoContext} from "@/context/userInfoContext"
import styled from '@emotion/styled'
import axios from 'axios'

import { useMutation } from "react-query"
import { useForm } from "react-hook-form"
import { ErrorMessage } from '@hookform/error-message';

import { useRouter } from 'next/router'

interface LoginData {
    email : string
    password : string
}

const LoginPageContainer = styled.div`
    width: 1200px;
    margin: 0 auto;
`

const InputWrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    column-gap: 1rem;
`

const Email = styled.input`
    width: 500px;
    height: 2rem;
`

export default function LoginPage() {
    const router = useRouter();
    const { register, formState: { errors , isSubmitting }, handleSubmit } = useForm<LoginData>({
        criteriaMode : "all"
      });

    const { setUser } = useContext(userInfoContext);

    const decodeToken = () => {
        const token = localStorage.getItem('token');
        const base64Payload  = token?.split('.')[1]

        if(!base64Payload) {
          console.log('token is invaild')
          return;
        }

        const payload = Buffer.from(base64Payload , 'base64')
        const userData = JSON.parse(payload.toString())

        setUser({nickname : userData.nickname})
        console.log('decode success')
      }


    const loginRequest = async (data: LoginData) => {
        try {
            const responce = await axios.post('http://13.209.193.45:3000/api/v1/auth/login',
                JSON.stringify(data),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )

            localStorage.setItem('token', responce.data.data);
            decodeToken();
            return responce.data;

        } catch (err) {
            console.log(err)
        }
    }

    const mutation = useMutation<any, Error, LoginData>("login", loginRequest)

    const onSubmit =  (data : LoginData) => {
        mutation.mutate(data)
        router.push("/")
    }


  return (
    <LoginPageContainer>
        <form onSubmit={handleSubmit(({email, password}) => onSubmit({email, password}))}>
            <InputWrapper >
                <label>ID</label>
                <Email type='text' {...register('email', {required : "This is required"})} />
                <ErrorMessage
                  errors={errors}
                  name="email"
                  render={({ message }) => <p>{message}</p>}
                />
            </InputWrapper>
            <InputWrapper >
                <label>password</label>
                <input type='password'
                {...register('password',
                    {required : "This is required" ,
                    minLength: { value: 8, message: "This input min-width is 8" }})}
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
            </InputWrapper>
            <button type='submit' disabled={isSubmitting}>로그인</button>
        </form>
    </LoginPageContainer>
  )
}
