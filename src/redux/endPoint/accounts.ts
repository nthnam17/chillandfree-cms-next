import { createApi } from '@reduxjs/toolkit/query/react';
import { objectToUrlParams } from '../../utils/convertData';
import { baseQuery } from '../api/index';

type QueryParams = {
    pageIndex?: number;
    pageSize?: number;
    status?: number | string;
    roleId?: number | string;
    name?: number | string;
};

export const accountApi = createApi({
    reducerPath: 'users',
    tagTypes: ['UsersTag'],
    baseQuery: baseQuery,
    endpoints: (build) => ({
        getListUser: build.query({
            query: (param: QueryParams) => {
                const string = objectToUrlParams(param);
                return {
                    url: `/user/getAllUser?${string}`,
                };
            },
            providesTags: ['UsersTag'],
            transformResponse: (res: any) => res?.data,
        }),
        getOneUser: build.query({
            query: (id) => {
                return {
                    url: `/user/${id}`,
                    method: 'GET',
                };
            },
        }),
        addUsers: build.mutation({
            query: (body) => {
                return {
                    url: '/user',
                    method: 'POST',
                    body,
                };
            },
            invalidatesTags: ['UsersTag'],
        }),
        editOneUsers: build.mutation({
            query(data) {
                return {
                    url: '/user',
                    method: 'PATCH',
                    body: data,
                };
            },
            invalidatesTags: ['UsersTag'],
        }),
        resetPassword: build.mutation({
            query(id: number) {
                return {
                    url: `/user/reset-password/${id}`,
                    method: 'POST',
                    body: id,
                };
            },
            invalidatesTags: ['UsersTag'],
        }),
        deleteOneUsers: build.mutation({
            query(id: number) {
                return {
                    url: `/user/${id}`,
                    method: 'DELETE',
                    body: id,
                };
            },
            invalidatesTags: ['UsersTag'],
        }),

    }),
});

export const {
    useAddUsersMutation,
    useDeleteOneUsersMutation,
    useEditOneUsersMutation,
    useGetListUserQuery,
    useResetPasswordMutation,
    useGetOneUserQuery,
} = accountApi;
