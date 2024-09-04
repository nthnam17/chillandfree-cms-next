/* eslint-disable no-console */
import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { HYDRATE } from 'next-redux-wrapper';
import { REHYDRATE } from 'redux-persist';
import Cookies from 'js-cookie';

// create a new mutex
const mutex = new Mutex();
export const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers, { endpoint }) => {
        const userToken = Cookies.get('accessToken') || '';
        if (userToken && endpoint !== 'refresh') {
            headers.set('Authorization', `Bearer ${userToken}`);
        }
        return headers;
    },
});
const baseQueryWithInterceptor: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    // wait until the mutex is available without locking it
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        // checking whether the mutex is locked
        if (!mutex.isLocked()) {
            // const release = await mutex.acquire();
            // try {
            //     const auth = (api.getState() as RootState)?.auth;
            //     if (auth?.accessToken && auth?.refreshToken) {
            //         const refreshResult: any = await baseQuery(
            //             {
            //                 url: 'auth/refresh',
            //                 method: 'POST',
            //                 body: { token: auth?.refreshToken },
            //             },
            //             api,
            //             extraOptions
            //         );
            //         if (
            //             refreshResult?.data?.accessToken &&
            //             refreshResult?.data?.refreshToken
            //         ) {
            //             // handle update new toke
            //             api.dispatch({
            //                 type: 'auth/tokenReceived',
            //                 payload: {
            //                     accessToken: refreshResult.data.accessToken,
            //                     refreshToken: refreshResult.data.refreshToken,
            //                 },
            //             });
            //             // retry the initial query
            //             result = await baseQuery(args, api, extraOptions);
            //         } else {
            //             // handle logout
            //             api.dispatch({ type: 'auth/logout' });
            //             window.location.pathname = '/login';
            //         }
            //     }
            // } finally {
            //     // release must be called once the mutex should be released again.
            //     release();
            // }
        } else {
            // wait until the mutex is available without locking it
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }
    return result;
};
export const api = createApi({
    baseQuery: baseQueryWithInterceptor,
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === REHYDRATE) {
            return action.payload?.[reducerPath];
        }
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
        return undefined;
    },
    endpoints: () => ({}),
});
