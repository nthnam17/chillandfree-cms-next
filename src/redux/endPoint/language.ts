import { createApi } from '@reduxjs/toolkit/query/react';
import { objectToUrlParams } from '../../utils/convertData';
import { baseQuery } from '../api/index';
import { language } from '@src/types/general';

type QueryParams = {
    pageIndex?: number;
    pageSize?: number;
};

export const languageApi = createApi({
    reducerPath: 'language',
    tagTypes: ['LanguageTags'],
    baseQuery: baseQuery,
    endpoints: (build) => ({
        getAllLanguage: build.query({
            query: (param: QueryParams) => {
                const string = objectToUrlParams(param);
                return {
                    url: `/language?${string}`,
                };
            },
            providesTags: ['LanguageTags'],
            transformResponse: (res: any) => res?.data.data as language[],
        }),

        getDataLanguages: build.query({
            query: (param: QueryParams) => {
                const string = objectToUrlParams(param);
                return {
                    url: `/language?${string}`,
                };
            },
            providesTags: ['LanguageTags'],
            transformResponse: (res: any) => res?.data,
        }),
        getLanguage: build.query({
            query: (id) => {
                return {
                    url: `/language/${id}`,
                    method: 'GET',
                };
            },
        }),
        createLanguage: build.mutation({
            query: (body) => {
                return {
                    url: '/language',
                    method: 'POST',
                    body,
                };
            },
            invalidatesTags: ['LanguageTags'],
        }),
        updateLanguage: build.mutation({
            query(data) {
                return {
                    url: '/language',
                    method: 'PATCH',
                    body: data,
                };
            },
            invalidatesTags: ['LanguageTags'],
        }),
        deleteLanguage: build.mutation({
            query(id: any) {
                return {
                    url: `/language/${id}`,
                    method: 'DELETE',
                    body: id,
                };
            },
            invalidatesTags: ['LanguageTags'],
        }),
    }),
});

export const {
    useGetAllLanguageQuery,
    useGetLanguageQuery,
    useCreateLanguageMutation,
    useDeleteLanguageMutation,
    useUpdateLanguageMutation,
    useGetDataLanguagesQuery,
} = languageApi;
