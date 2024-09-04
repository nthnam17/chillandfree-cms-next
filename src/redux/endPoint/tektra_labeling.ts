import { useAddNewsGenreMutation } from '@src/redux/endPoint/news_genre';
import { createApi } from '@reduxjs/toolkit/query/react';
import { objectToUrlParams } from '../../utils/convertData';
import { baseQuery } from '../api/index';
import {
    Procedure,
    QueryParamsProcedure,
    QueryParamsSlide,
    TektraLabeling,
} from '@src/types/tektra_lableing';

export const tektraLabelingApi = createApi({
    reducerPath: 'tektraLabeling',
    tagTypes: ['TektraLabelingTag'],
    baseQuery: baseQuery,
    endpoints: (build) => ({
        getTektraLabeling: build.query<TektraLabeling, void>({
            query: () => {
                return {
                    url: `/manageLabel`,
                    method: 'GET',
                };
            },
            providesTags: ['TektraLabelingTag'],
            transformResponse: (res: any) => res?.data,
        }),
        editTektraLabeling: build.mutation({
            query: (data) => {
                return {
                    url: `/manageLabel`,
                    method: 'PATCH',
                    body: data,
                };
            },
        }),
    }),
});

export const procedureApi = createApi({
    reducerPath: 'procedure',
    tagTypes: ['ProcedureTag'],
    baseQuery: baseQuery,
    endpoints: (build) => ({
        getListProcedure: build.query({
            query: (param: QueryParamsProcedure) => {
                const string = objectToUrlParams(param);
                return {
                    url: `/procedure?${string}`,
                };
            },
            providesTags: ['ProcedureTag'],
            transformResponse: (res: any) => res?.data,
        }),
        getOneProcedure: build.query<Procedure, number>({
            query: (id) => {
                return {
                    url: `/procedure/${id}`,
                    method: 'GET',
                };
            },
            providesTags: ['ProcedureTag'],
            transformResponse: (res: any) => res?.data,
        }),
        addProcedure: build.mutation({
            query: (body) => {
                return {
                    url: '/procedure',
                    method: 'POST',
                    body,
                };
            },
            invalidatesTags: ['ProcedureTag'],
        }),
        editOneProcedure: build.mutation({
            query(data) {
                return {
                    url: '/procedure',
                    method: 'PATCH',
                    body: data,
                };
            },
            invalidatesTags: ['ProcedureTag'],
        }),
        deleteOneProcedure: build.mutation({
            query(id: any) {
                return {
                    url: `/procedure/${id}`,
                    method: 'DELETE',
                    body: id,
                };
            },
            invalidatesTags: ['ProcedureTag'],
        }),
    }),
});

export const slideApi = createApi({
    reducerPath: 'slide',
    tagTypes: ['SlideTag'],
    baseQuery: baseQuery,
    endpoints: (build) => ({
        getListSlide: build.query({
            query: (param: QueryParamsSlide) => {
                const string = objectToUrlParams(param);
                return {
                    url: `/slide?${string}`,
                };
            },
            providesTags: ['SlideTag'],
            transformResponse: (res: any) => res?.data,
        }),
        getOneSlide: build.query<QueryParamsSlide, number>({
            query: (id) => {
                return {
                    url: `/slide/${id}`,
                    method: 'GET',
                };
            },
            providesTags: ['SlideTag'],
            transformResponse: (res: any) => res?.data,
        }),
        addSlide: build.mutation({
            query: (body) => {
                return {
                    url: '/slide',
                    method: 'POST',
                    body,
                };
            },
            invalidatesTags: ['SlideTag'],
        }),
        editOneSlide: build.mutation({
            query(data) {
                return {
                    url: '/slide',
                    method: 'PATCH',
                    body: data,
                };
            },
            invalidatesTags: ['SlideTag'],
        }),
        deleteOneSlide: build.mutation({
            query(id: any) {
                return {
                    url: `/slide/${id}`,
                    method: 'DELETE',
                    body: id,
                };
            },
            invalidatesTags: ['SlideTag'],
        }),
    }),
});

export const { useEditTektraLabelingMutation, useGetTektraLabelingQuery } =
    tektraLabelingApi;
export const {
    useAddProcedureMutation,
    useGetListProcedureQuery,
    useGetOneProcedureQuery,
    useDeleteOneProcedureMutation,
    useEditOneProcedureMutation,
} = procedureApi;
export const {
    useGetListSlideQuery,
    useGetOneSlideQuery,
    useAddSlideMutation,
    useEditOneSlideMutation,
    useDeleteOneSlideMutation,
} = slideApi;
