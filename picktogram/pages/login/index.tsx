import React, { useContext } from 'react'
import styled from '@emotion/styled'
import axios from 'axios'
import { useMutation } from "react-query"
import { useForm } from "react-hook-form"
import { ErrorMessage } from '@hookform/error-message';
import { useRouter } from 'next/router'
import { LoginData } from "@/src/types/types"
import { GetServerSidePropsContext, NextApiResponse } from 'next'
import { authenticateUser, userFromRequest } from '@/src/auth/tokens'
import useServerRefresher from '@/src/hooks/useServerRefresher'
import LocalStorage from '@/util/localStorage'
import Link from 'next/dist/client/link'

const LoginPageContainer = styled.div`
    width: 1400px;
    height: 700px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 16px auto;
    box-shadow: 27px 43px 43px -26px rgba(89,89,89,0.39);
`

const About = styled.div`
    width: 700px;
    height: 100%;
    padding: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    row-gap: 1rem;
    color : white;
    border-right: 1px solid black;
    background-image:
  radial-gradient(ellipse farthest-corner at 0 140%, #5d9dff 0%, #2178ff 70%, #3585ff 70%);
`

const Form = styled.form`
    width: 700px;
    height: 100%;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 16px;

    & button {
        width: 280px;
        height: 50px;
        margin-bottom: 16px;
        background-color: #166caa;
        color : white;
        border: none;
        border-radius: 20px;
        font-size: 16px;
        cursor: pointer;
    }
`

const InputWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    row-gap: 1rem;
`

const Email = styled.input`
    width: 300px;
    height: 2rem;
    padding: 1rem;
    border: none;
    border-bottom: 1.5px solid black;
`

const Password = styled(Email)``

const LoginMenu = styled.div`
    display: flex;
    column-gap: 1rem;
`

export const getServerSideProps = async (context : GetServerSidePropsContext) => {
    const data  = await userFromRequest(context.req)

    if(data?.user) {
        return {
            redirect : {
              destination : '/',
              permanent : false,
            },
        }
    }

    return {
        props : {}
    }
}

 function LoginPage() {
    const router = useRouter();
    const { register, formState: { errors , isSubmitting }, handleSubmit } = useForm<LoginData>({
        criteriaMode : "all"
      });

    const loginRequest = async ( data: LoginData ) => {
        try {
            const responce = await axios.post('http://13.209.193.45:3000/api/v1/auth/login',
                JSON.stringify(data),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )

            // 로그인 유지용
            authenticateUser(responce.data.data)
            LocalStorage.setItem('token', responce.data.data)
            return responce.data;

        } catch (err) {
            console.log(err)
        }
    }

    const mutation = useMutation<any, Error, LoginData>("login", loginRequest, {
        onSuccess : useServerRefresher(),
    })

    const onSubmit =  (data : LoginData) => {
        mutation.mutate(data);
        router.push("/");
    }

  return (
    <LoginPageContainer>
        <About>
            <h1>Welcome to Picktogram</h1>
            <div>
                Picktogram is SNS for designer
            </div>
        </About>
        <Form onSubmit={handleSubmit(({email, password}) => onSubmit({email, password}))}>
            <h2>Login</h2>
            <InputWrapper >
                <Email type='text' {...register('email', {required : "This is required"})} placeholder="Email" />
                <ErrorMessage
                errors={errors}
                name="email"
                render={({ message }) => <p>{message}</p>}
                />
            </InputWrapper>
            <InputWrapper >
                <Password type='password'
                {...register('password',
                    {required : "This is required" ,
                    minLength: { value: 8, message: "This input min-width is 8" }})}
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
            </InputWrapper>
            <button type='submit' disabled={isSubmitting}>login</button>
            <LoginMenu>
                <Link href="##">Forget Password?</Link>
                <Link href="##">Sign Up</Link>
            </LoginMenu>
        </Form>
    </LoginPageContainer>
  )
}


export default LoginPage