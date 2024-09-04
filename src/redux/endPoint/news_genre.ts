import { baseQuery } from '../api/index';
import { createApi } from '@reduxjs/toolkit/query/react';
import { objectToUrlParams } from '../../utils/convertData';

type QueryParams = {
    page?: number;
    pageSize?: number;
    status?: number | string;
    name?: number | string;
};

export const newsGenreApi = createApi({
    reducerPath: 'news_genre',
    tagTypes: ['NewsGenreTag', 'SingleNewGenreTags'],
    baseQuery: baseQuery,
    endpoints: (build) => ({
        getListNewsGenre: build.query({
            query: (param: QueryParams) => {
                const string = objectToUrlParams(param);
                return {
                    url: `/newsgenre?${string}`,
                };
            },
            providesTags: ['NewsGenreTag'],
            transformResponse: (res: any) => res?.data,
        }),
        getNewsGenre: build.query({
            query: ({ id }) => {
                return {
                    url: `/newsgenre/${id}`,
                    method: 'GET',
                };
            },
            providesTags: ['SingleNewGenreTags'],
            transformResponse: (res: any) => res?.data,
        }),
        addNewsGenre: build.mutation({
            query: (body) => {
                return {
                    url: '/newsgenre',
                    method: 'POST',
                    body,
                };
            },
            invalidatesTags: ['NewsGenreTag'],
        }),
        editNewsGenre: build.mutation({
            query(data) {
                return {
                    url: '/newsgenre',
                    method: 'PATCH',
                    body: data,
                };
            },
            invalidatesTags: ['NewsGenreTag', 'SingleNewGenreTags'],
        }),
        deleteNewsGenre: build.mutation({
            query(id: any) {
                return {
                    url: `/newsgenre/${id}`,
                    method: 'DELETE',
                    body: id,
                };
            },
            invalidatesTags: ['NewsGenreTag'],
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
    useGetListNewsGenreQuery,
    useDeleteNewsGenreMutation,
    useAddNewsGenreMutation,
    useEditNewsGenreMutation,
    useGetNewsGenreQuery,
} = newsGenreApi;
