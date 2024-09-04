import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../api/index';

export const uploadImageApi = createApi({
    reducerPath: 'uploadImage',
    tagTypes: ['UploadImageTag'],
    baseQuery: baseQuery,
    endpoints: (build) => ({
        uploadImage: build.mutation({
            query: (data) => {
                return {
                    url: `/file/uploadMuch`,
                    method: 'POST',
                    body: data,
                };
            },
            transformResponse: (res: any) => res?.data,
        }),
    }),
});

export const { useUploadImageMutation } = uploadImageApi;
