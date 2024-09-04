import { LoginType } from '@src/components/common/Login/Login.type';
import { api, baseQuery } from '../api/index';
import { FetchBaseQueryError, createApi } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { SerializedError } from '@reduxjs/toolkit';

export const loginApi = createApi({
    reducerPath: 'loginApi',
    tagTypes: ['Login'],
    baseQuery: baseQuery,
    endpoints: (build) => ({
        login: build.mutation<ApiResponseLogin<DataLogin>, LoginType>({
            query: (queryArg: LoginType) => ({
                url: '/login',
                method: 'POST',
                body: queryArg,
            }),
            transformResponse: (res: any) => {
                if (res.statusCode == 200) {
                    const token = res.data?.accessToken;
                    const expirationDate = new Date();
                    expirationDate.setDate(expirationDate.getDate() + 7);
                    if (token) {
                        Cookies.set('accessToken', token, {
                            expires: expirationDate,
                        });
                    }
                }
                return res.data
            },
        }),
    })

})

export interface DataLogin {
    accessToken: string;
    tokentType: string;
    usernameOrEmail: string;
}

export interface ApiResponseLogin<T> {
    status: boolean;
    data: T;
    error: string | null;
    statusCode: number;
    message: string;
}


export interface LoginUserApiResponse {
    data?: ApiResponseLogin<DataLogin>;
    error?: FetchBaseQueryError | SerializedError;
}


export const { useLoginMutation } = loginApi