import { createApi } from '@reduxjs/toolkit/query/react';
import { objectToUrlParams } from '../../utils/convertData';
import { baseQuery } from '../api/index';
import { General, GeneralField, GeneralQuantities, QueryParamsField, QueryParamsQuantity } from '@src/types/general';


export const generalApi = createApi({
    reducerPath: 'general',
    tagTypes: ['GeneralTag'],
    baseQuery: baseQuery,
    endpoints: (build) => ({
        getGeneral: build.query<General, void>({
            query: () => {
                return {
                    url: `/general`,
                    method: 'GET'
                };
            },
            providesTags: ['GeneralTag'],
            transformResponse: (res: any) => res?.data,
        }),
        editGeneral: build.mutation({
            query: (data) => {
                return {
                    url: `/general`,
                    method: 'PATCH',
                    body: data,
                };
            },
            invalidatesTags: ['GeneralTag'],
        }),
    }),
});


export const generalFieldApi = createApi({
    reducerPath: 'generalField',
    tagTypes: ['GeneralFieldTag'],
    baseQuery: baseQuery,
    endpoints: (build) => ({
        getListGeneralField: build.query({
            query: (param: QueryParamsField) => {
                const string = objectToUrlParams(param);
                return {
                    url: `/generalfield`,
                };
            },
            providesTags: ['GeneralFieldTag'],
            transformResponse: (res: any) => res?.data,
        }),
        getOneGeneralField: build.query<GeneralField, number>({
            query: (id) => {
                return {
                    url: `/generalfield/${id}`,
                    method: 'GET',
                };
            },
            providesTags: ['GeneralFieldTag'],
            transformResponse: (res: any) => res?.data,
        }),
        addGeneralField: build.mutation({
            query: (data) => {
                return {
                    url: '/generalfield',
                    method: 'POST',
                    body: data,
                };
            },
            invalidatesTags: ['GeneralFieldTag'],
        }),
        editOneGeneralField: build.mutation({
            query(data) {
                return {
                    url: '/generalfield',
                    method: 'PATCH',
                    body: data,
                };
            },
            invalidatesTags: ['GeneralFieldTag'],
        }),
        deleteOneGeneralField: build.mutation({
            query(id: any) {
                return {
                    url: `/generalfield/${id}`,
                    method: 'DELETE',
                    body: id,
                };
            },
            invalidatesTags: ['GeneralFieldTag'],
        }),
    }),
});


export const generalQuantityApi = createApi({
    reducerPath: 'generalQuantity',
    tagTypes: ['GeneralQuantityTag'],
    baseQuery: baseQuery,
    endpoints: (build) => ({
        getListGeneralQuantity: build.query({
            query: (param: QueryParamsQuantity) => {
                const string = objectToUrlParams(param);
                return {
                    url: `/generalquantity`,
                };
            },
            providesTags: ['GeneralQuantityTag'],
            transformResponse: (res: any) => res?.data,
        }),
        getOneGeneralQuantity: build.query<GeneralQuantities, number>({
            query: (id) => {
                return {
                    url: `/generalquantity/${id}`,
                    method: 'GET',
                };
            },
            providesTags: ['GeneralQuantityTag'],
            transformResponse: (res: any) => res?.data,
        }),
        addGeneralQuantity: build.mutation({
            query: (data) => {
                return {
                    url: '/generalquantity',
                    method: 'POST',
                    body: data,
                };
            },
            invalidatesTags: ['GeneralQuantityTag'],
        }),
        editOneGeneralQuantity: build.mutation({
            query(data) {
                return {
                    url: '/generalquantity',
                    method: 'PATCH',
                    body: data,
                };
            },
            invalidatesTags: ['GeneralQuantityTag'],
        }),
        deleteOneGeneralQuantity: build.mutation({
            query(id: any) {
                return {
                    url: `/generalquantity/${id}`,
                    method: 'DELETE',
                    body: id,
                };
            },
            invalidatesTags: ['GeneralQuantityTag'],
        }),
    }),
});

export const { useGetGeneralQuery, useEditGeneralMutation } = generalApi
export const { useAddGeneralFieldMutation, useDeleteOneGeneralFieldMutation, useEditOneGeneralFieldMutation, useGetListGeneralFieldQuery, useGetOneGeneralFieldQuery } = generalFieldApi
export const { useAddGeneralQuantityMutation, useDeleteOneGeneralQuantityMutation, useEditOneGeneralQuantityMutation, useGetListGeneralQuantityQuery, useGetOneGeneralQuantityQuery } = generalQuantityApi