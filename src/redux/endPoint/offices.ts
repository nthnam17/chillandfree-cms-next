import { createApi } from '@reduxjs/toolkit/query/react';
import { objectToUrlParams } from '../../utils/convertData';
import { baseQuery } from '../api/index';

type QueryParams = {
    pageIndex?: number;
    pageSize?: number;
    status?: boolean;
};

export const officesApi = createApi({
    reducerPath: 'offices',
    tagTypes: ['OfficesTag'],
    baseQuery: baseQuery,
    endpoints: (build) => ({
        getAllOffices: build.query({
            query: (param: QueryParams) => {
                const string = objectToUrlParams(param);
                return {
                    url: `/offices?${string}`,
                };
            },
            providesTags: ['OfficesTag'],
            transformResponse: (res: any) => res?.data,
        }),
        getOffices: build.query({
            query: ({ id }) => {
                return {
                    url: `/offices/${id}`,
                    method: 'GET',
                };
            },
            transformResponse: (res: any) => res?.data,
        }),
        createOffices: build.mutation({
            query: (body) => {
                return {
                    url: '/offices',
                    method: 'POST',
                    body,
                };
            },
            invalidatesTags: ['OfficesTag'],
        }),
        updateOffices: build.mutation({
            query(data) {
                return {
                    url: '/offices',
                    method: 'PATCH',
                    body: data,
                };
            },
            invalidatesTags: ['OfficesTag'],
        }),
        deleteOffices: build.mutation({
            query(id: any) {
                return {
                    url: `/offices/${id}`,
                    method: 'DELETE',
                    body: id,
                };
            },
            invalidatesTags: ['OfficesTag'],
        }),
    }),
});

export const {
    useGetOfficesQuery,
    useGetAllOfficesQuery,
    useCreateOfficesMutation,
    useDeleteOfficesMutation,
    useUpdateOfficesMutation,
} = officesApi;
