import React from 'react'
import LoginUI from './Login.presenter'
import axios from 'axios'
import { useMutation } from "react-query"
import { useForm } from "react-hook-form"
import { useRouter } from 'next/router'
import { LoginData } from './Login.type'
import { authenticateUser } from '@/src/auth/tokens'
import useServerRefresher from '@/src/hooks/useServerRefresher'
import { SERVER_URL } from "@/util/constant"

export default function Login() {

    console.log(SERVER_URL)

    const router = useRouter();
    const { register, formState: { errors , isSubmitting }, handleSubmit } = useForm<LoginData>({
        criteriaMode : "all"
        });

    const loginRequest = async ( data: LoginData ) => {
        try {
            const responce = await axios.post(`${SERVER_URL}/api/v1/auth/login`,
                JSON.stringify(data),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )

            // 로그인 유지용
            authenticateUser(responce.data.data)
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
    <LoginUI
        register={register}
        errors={errors}
        isSubmitting={isSubmitting}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
    />
  )
}
