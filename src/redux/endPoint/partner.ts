import { createApi } from '@reduxjs/toolkit/query/react';
import { objectToUrlParams } from '../../utils/convertData';
import { baseQuery } from '../api/index';

type QueryParams = {
    pageIndex?: number;
    pageSize?: number;
    status?: boolean;
};

export const partnerApi = createApi({
    reducerPath: 'partner',
    tagTypes: ['PartnerTags'],
    baseQuery: baseQuery,
    endpoints: (build) => ({
        getAllPartner: build.query({
            query: (param: QueryParams) => {
                const string = objectToUrlParams(param);
                return {
                    url: `/partner?${string}`,
                };
            },
            providesTags: ['PartnerTags'],
            transformResponse: (res: any) => res?.data,
        }),
        getPartner: build.query({
            query: (id) => {
                return {
                    url: `/partner/${id}`,
                    method: 'GET',
                };
            },
        }),
        createPartner: build.mutation({
            query: (body) => {
                return {
                    url: '/partner',
                    method: 'POST',
                    body,
                };
            },
            invalidatesTags: ['PartnerTags'],
        }),
        updatePartner: build.mutation({
            query(data) {
                return {
                    url: '/partner',
                    method: 'PATCH',
                    body: data,
                };
            },
            invalidatesTags: ['PartnerTags'],
        }),
        deletePartner: build.mutation({
            query(id: any) {
                return {
                    url: `/partner/${id}`,
                    method: 'DELETE',
                    body: id,
                };
            },
            invalidatesTags: ['PartnerTags'],
        }),
    }),
});

export const {
    useGetAllPartnerQuery,
    useGetPartnerQuery,
    useCreatePartnerMutation,
    useDeletePartnerMutation,
    useUpdatePartnerMutation,
} = partnerApi;
