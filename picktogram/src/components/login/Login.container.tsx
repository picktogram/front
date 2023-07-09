import React, { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useMutation } from "react-query"
import { useForm } from "react-hook-form"
import { useRouter } from 'next/router'
import { LoginData } from './Login.type'
import { authenticateUser } from '@/src/auth/tokens'
import { useSetRecoilState } from 'recoil'
import { tokenState } from "@/state/tokenState"
import { AxiosError } from 'axios'
import { SERVER_URL } from '@/util/constant';

import parceError from '@/util/parseError'
import * as Apis from 'picktogram-server-apis/api/functional';

import LoginUI from './Login.presenter'
import RegisterModal from '../commons/modals/registerModal'

export default function Login() {
    const router = useRouter();
    const setTokenState = useSetRecoilState(tokenState);
    const { register, formState: { errors , isSubmitting }, handleSubmit } = useForm<LoginData>({
        criteriaMode : "all"
    });

    const mutation = useMutation('User Login', async ({email, password} : LoginData) => {
        try {
            const response = await Apis.api.v1.auth.login({
                host : SERVER_URL as string,
            }, {
                email,
                password,
            })

            return response
        } catch (error) {
            console.log(error)
        }
    }, {
        onSuccess : (data) => {
            if(data) {
                authenticateUser(data.data);
                setTokenState(data.data);
            }
        },
        onError : (error : AxiosError) => {
            if(error.response?.statusText) {
                toast.error(parceError(error))
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
