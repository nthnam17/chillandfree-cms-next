import { createApi } from '@reduxjs/toolkit/query/react';
import { objectToUrlParams } from '../../utils/convertData';
import { baseQuery } from '../api/index';
import {
    Development,
    ManagerIT,
    ProductIt,
    QueryParamsDevelopment,
    QueryParamsProductIt,
} from '@src/types/tektra_it';

export const managerItApi = createApi({
    reducerPath: 'managerIt',
    tagTypes: ['ManagerItTag'],
    baseQuery: baseQuery,
    endpoints: (build) => ({
        getManagerIt: build.query<ManagerIT, void>({
            query: () => {
                return {
                    url: `/manageIt`,
                    method: 'GET',
                };
            },
            providesTags: ['ManagerItTag'],
            transformResponse: (res: any) => res?.data,
        }),
        editManagerIt: build.mutation({
            query: (data) => {
                return {
                    url: `/manageIt`,
                    method: 'PATCH',
                    body: data,
                };
            },
            invalidatesTags: ['ManagerItTag'],
        }),
    }),
});

export const productItApi = createApi({
    reducerPath: 'productIt',
    tagTypes: ['ProductItTag'],
    baseQuery: baseQuery,
    endpoints: (build) => ({
        getListProductIt: build.query({
            query: (param: QueryParamsProductIt) => {
                const string = objectToUrlParams(param);
                return {
                    url: `/product?${string}`,
                };
            },
            providesTags: ['ProductItTag'],
            transformResponse: (res: any) => res?.data,
        }),
        getOneProductIt: build.query<ProductIt, number>({
            query: (id) => {
                return {
                    url: `/product/${id}`,
                    method: 'GET',
                };
            },
            providesTags: ['ProductItTag'],
            transformResponse: (res: any) => res?.data,
        }),
        addProductIt: build.mutation({
            query: (body) => {
                return {
                    url: '/product',
                    method: 'POST',
                    body,
                };
            },
            invalidatesTags: ['ProductItTag'],
        }),
        editOneProductIt: build.mutation({
            query(data) {
                return {
                    url: '/product',
                    method: 'PATCH',
                    body: data,
                };
            },
            invalidatesTags: ['ProductItTag'],
        }),
        deleteOneProductIt: build.mutation({
            query(id: any) {
                return {
                    url: `/product/${id}`,
                    method: 'DELETE',
                    body: id,
                };
            },
            invalidatesTags: ['ProductItTag'],
        }),
    }),
});

export const developmentItApi = createApi({
    reducerPath: 'developmentIt',
    tagTypes: ['DevelopmentItTag'],
    baseQuery: baseQuery,
    endpoints: (build) => ({
        getListDevelopmentIt: build.query({
            query: (param: QueryParamsDevelopment) => {
                const string = objectToUrlParams(param);
                return {
                    url: `/development?${string}`,
                };
            },
            providesTags: ['DevelopmentItTag'],
            transformResponse: (res: any) => res?.data,
        }),
        getOneDevelopmentIt: build.query<Development, number>({
            query: (id) => {
                return {
                    url: `/development/${id}`,
                    method: 'GET',
                };
            },
            providesTags: ['DevelopmentItTag'],
            transformResponse: (res: any) => res?.data,
        }),
        addDevelopmentIt: build.mutation({
            query: (body) => {
                return {
                    url: '/development',
                    method: 'POST',
                    body,
                };
            },
            invalidatesTags: ['DevelopmentItTag'],
        }),
        editOneDevelopmentIt: build.mutation({
            query(data) {
                return {
                    url: '/development',
                    method: 'PATCH',
                    body: data,
                };
            },
            invalidatesTags: ['DevelopmentItTag'],
        }),
        deleteOneDevelopmentIt: build.mutation({
            query(id: any) {
                return {
                    url: `/development/${id}`,
                    method: 'DELETE',
                    body: id,
                };
            },
            invalidatesTags: ['DevelopmentItTag'],
        }),
    }),
});

export const { useGetManagerItQuery, useEditManagerItMutation } = managerItApi;
export const {
    useGetListProductItQuery,
    useGetOneProductItQuery,
    useAddProductItMutation,
    useEditOneProductItMutation,
    useDeleteOneProductItMutation,
} = productItApi;
export const {
    useGetListDevelopmentItQuery,
    useGetOneDevelopmentItQuery,
    useAddDevelopmentItMutation,
    useDeleteOneDevelopmentItMutation,
    useEditOneDevelopmentItMutation,
} = developmentItApi;
