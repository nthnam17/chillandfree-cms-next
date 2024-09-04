import { baseQuery } from '../api/index';
import { createApi } from '@reduxjs/toolkit/query/react';
import { objectToUrlParams } from '../../utils/convertData';

type QueryParams = {
    pageIndex?: number;
    pageSize?: number;
    status?: number | string;
    name?: number | string;
};

export const newsApi = createApi({
    reducerPath: 'news',
    tagTypes: ['NewsTag', 'SingleNewTags'],
    baseQuery: baseQuery,
    endpoints: (build) => ({
        getListNews: build.query({
            query: (param: QueryParams) => {
                const string = objectToUrlParams(param);
                return {
                    url: `/new/getdata?${string}`,
                };
            },
            providesTags: ['NewsTag'],
            transformResponse: (res: any) => res?.data,
        }),
        getNews: build.query({
            query: ({ id }) => {
                return {
                    url: `/new/getNews/${id}`,
                    method: 'GET',
                };
            },
            providesTags: ['SingleNewTags'],
            transformResponse: (res: any) => res?.data,
        }),
        addNews: build.mutation({
            query: (body) => {
                return {
                    url: '/new',
                    method: 'POST',
                    body,
                };
            },
            invalidatesTags: ['NewsTag'],
        }),
        editNews: build.mutation({
            query(data) {
                return {
                    url: '/new',
                    method: 'PATCH',
                    body: data,
                };
            },
            invalidatesTags: ['NewsTag', 'SingleNewTags'],
        }),
        deleteNews: build.mutation({
            query(id: any) {
                return {
                    url: `/new/${id}`,
                    method: 'DELETE',
                    body: id,
                };
            },
            invalidatesTags: ['NewsTag'],
        }),
    }),
});

export interface ApiResponse<T> {
    status: boolean;
    data: T;
    error: string | null;
    statusCode: number;
    message: string;
}

export const {
    useGetListNewsQuery,
    useDeleteNewsMutation,
    useAddNewsMutation,
    useEditNewsMutation,
    useGetNewsQuery,
} = newsApi;
