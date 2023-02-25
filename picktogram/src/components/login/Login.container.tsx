import React from 'react'
import LoginUI from './Login.presenter'
import { useMutation } from "react-query"
import { useForm } from "react-hook-form"
import { useRouter } from 'next/router'
import { LoginData } from './Login.type'
import { authenticateUser } from '@/src/auth/tokens'
import useServerRefresher from '@/src/hooks/useServerRefresher'
import { fetcher } from '@/util/queryClient'

export default function Login() {
    const router = useRouter();

    const { register, formState: { errors , isSubmitting }, handleSubmit } = useForm<LoginData>({
        criteriaMode : "all"
        });

    const mutation = useMutation<any, Error, LoginData>('login', (data : LoginData) => fetcher({
        method : 'post',
        path : `/api/v1/auth/login`,
        data : data,
        headers : {
            'Content-Type': 'application/json',
        },
    }), {
        onSuccess : (data) => {
            authenticateUser(data);
        }
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
