import { createApi } from '@reduxjs/toolkit/query/react';
import { objectToUrlParams } from '../../utils/convertData';
import { baseQuery } from '../api/index';

type QueryParams = {
    pageIndex?: number;
    pageSize?: number;
    status?: boolean;
};

export const recruitmentApi = createApi({
    reducerPath: 'recruitment',
    tagTypes: ['RecruitmentTags'],
    baseQuery: baseQuery,
    endpoints: (build) => ({
        getAllRecruitment: build.query({
            query: (param: QueryParams) => {
                const string = objectToUrlParams(param);
                return {
                    url: `/recruitment?${string}`,
                };
            },
            providesTags: ['RecruitmentTags'],
            transformResponse: (res: any) => res?.data,
        }),
        getRecruitment: build.query({
            query: (id) => {
                return {
                    url: `/recruitment/${id}`,
                    method: 'GET',
                };
            },
        }),
        updateRecruitment: build.mutation({
            query(data) {
                return {
                    url: '/recruitment',
                    method: 'PATCH',
                    body: data,
                };
            },
            invalidatesTags: ['RecruitmentTags'],
        }),
        deleteRecruitment: build.mutation({
            query(id: any) {
                return {
                    url: `/recruitment/${id}`,
                    method: 'DELETE',
                    body: id,
                };
            },
            invalidatesTags: ['RecruitmentTags'],
        }),
    }),
});

export const {
    useGetAllRecruitmentQuery,
    useGetRecruitmentQuery,
    useUpdateRecruitmentMutation,
    useDeleteRecruitmentMutation,
} = recruitmentApi;
