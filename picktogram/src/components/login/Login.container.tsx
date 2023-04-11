import React from 'react'
import LoginUI from './Login.presenter'
import RegisterModal from '../commons/modals/registerModal'

import { toast } from 'react-hot-toast'
import { useMutation } from "react-query"
import { useForm } from "react-hook-form"
import { useRouter } from 'next/router'
import { LoginData } from './Login.type'
import { authenticateUser } from '@/src/auth/tokens'
import { fetcher } from '@/util/queryClient'
import { useSetRecoilState } from 'recoil'
import { tokenState } from "@/state/tokenState"
import { AxiosError } from 'axios'

export default function Login() {
    const router = useRouter();
    const setTokenState = useSetRecoilState(tokenState);
    const { register, formState: { errors , isSubmitting }, handleSubmit } = useForm<LoginData>({
        criteriaMode : "all"
    });

    const mutation = useMutation<string, AxiosError, LoginData>('login', (data : LoginData) => fetcher({
        method : 'post',
        path : `/api/v1/auth/login`,
        data : data,
        headers : {
            'Content-Type': 'application/json',
        },
    }), {
        onSuccess : (data) => {
            authenticateUser(data);
            setTokenState(data);
        },
        onError : (error) => {
            console.log(error)

            if(error.response?.statusText) {
                toast.error(error.response?.statusText)
            } else {
                toast.error('Something is wrong. Login failed.')
            }
        }
    })

    const onSubmit =  (data : LoginData) => {
        mutation.mutate(data);
        router.replace("/");
    }

   return (

    <>
        <LoginUI
            register={register}
            errors={errors}
            isSubmitting={isSubmitting}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
        />
        <RegisterModal />
    </>

   )
}
