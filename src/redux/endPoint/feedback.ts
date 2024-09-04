import { createApi } from '@reduxjs/toolkit/query/react';
import { objectToUrlParams } from '../../utils/convertData';
import { baseQuery } from '../api/index';

type QueryParams = {
    pageIndex?: number;
    pageSize?: number;
    status?: boolean;
};

export const feedbackApi = createApi({
    reducerPath: 'feedback',
    tagTypes: ['FeedbackTags'],
    baseQuery: baseQuery,
    endpoints: (build) => ({
        getAllFeedback: build.query({
            query: (param: QueryParams) => {
                const string = objectToUrlParams(param);
                return {
                    url: `/feedback?${string}`,
                };
            },
            providesTags: ['FeedbackTags'],
            transformResponse: (res: any) => res?.data,
        }),
        getFeedback: build.query({
            query: (id) => {
                return {
                    url: `/feedback/${id}`,
                    method: 'GET',
                };
            },
        }),
        updateFeedback: build.mutation({
            query(data) {
                return {
                    url: '/feedback',
                    method: 'PATCH',
                    body: data,
                };
            },
            invalidatesTags: ['FeedbackTags'],
        }),
        deleteFeedback: build.mutation({
            query(id: any) {
                return {
                    url: `/feedback/${id}`,
                    method: 'DELETE',
                    body: id,
                };
            },
            invalidatesTags: ['FeedbackTags'],
        }),
    }),
});

export const {
    useGetAllFeedbackQuery,
    useGetFeedbackQuery,
    useUpdateFeedbackMutation,
    useDeleteFeedbackMutation,
} = feedbackApi;
