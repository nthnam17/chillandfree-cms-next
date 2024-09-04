import { createApi } from '@reduxjs/toolkit/query/react';
import { objectToUrlParams } from '../../utils/convertData';
import { baseQuery } from '../api/index';

type QueryParams = {
    pageIndex?: number;
    pageSize?: number;
    status?: boolean;
};

export const serviceApi = createApi({
    reducerPath: 'service',
    tagTypes: ['ServiceTags', 'SingleServicesTags'],
    baseQuery: baseQuery,
    endpoints: (build) => ({
        getAllService: build.query({
            query: (param: QueryParams) => {
                const string = objectToUrlParams(param);
                return {
                    url: `/services?${string}`,
                };
            },
            providesTags: ['ServiceTags'],
            transformResponse: (res: any) => res?.data,
        }),
        getService: build.query({
            query: ({ id }) => {
                return {
                    url: `/services/${id}`,
                    method: 'GET',
                };
            },
            providesTags: ['SingleServicesTags'],
            transformResponse: (res: any) => res?.data,
        }),

        createService: build.mutation({
            query: (body) => {
                return {
                    url: '/services',
                    method: 'POST',
                    body,
                };
            },
            invalidatesTags: ['ServiceTags'],
        }),
        updateService: build.mutation({
            query(data) {
                return {
                    url: '/services',
                    method: 'PATCH',
                    body: data,
                };
            },
            invalidatesTags: ['ServiceTags', 'SingleServicesTags'],
        }),
        deleteService: build.mutation({
            query(id: any) {
                return {
                    url: `/services/${id}`,
                    method: 'DELETE',
                    body: id,
                };
            },
            invalidatesTags: ['ServiceTags'],
        }),
    }),
});

export const {
    useGetServiceQuery,
    useGetAllServiceQuery,
    useCreateServiceMutation,
    useDeleteServiceMutation,
    useUpdateServiceMutation,
} = serviceApi;
