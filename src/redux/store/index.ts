import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { api } from '../api';
import sideBarSlice from '../slices/sideBarSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { loginApi } from '../endPoint/login';
import { accountApi } from '../endPoint/accounts';
import { languageApi } from '../endPoint/language';
import { partnerApi } from '../endPoint/partner';
import { newsGenreApi } from '../endPoint/news_genre';
import {
    developmentItApi,
    managerItApi,
    productItApi,
} from '../endPoint/manager_it';
import {
    procedureApi,
    tektraLabelingApi,
    slideApi,
} from '../endPoint/tektra_labeling';
import { uploadImageApi } from '../endPoint/upload_image';
import { serviceApi } from '../endPoint/service';
import { feedbackApi } from '../endPoint/feedback';
import { newsApi } from '../endPoint/news';
import { recruitmentApi } from '../endPoint/recruitment';
import {
    generalApi,
    generalFieldApi,
    generalQuantityApi,
} from '../endPoint/general';
import { officesApi } from '../endPoint/offices';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['data'],
};

const makeStore = () => {
    const reducers = combineReducers({
        [api.reducerPath]: api.reducer,
        actionShow: sideBarSlice,
        [loginApi.reducerPath]: loginApi.reducer,
        [accountApi.reducerPath]: accountApi.reducer,
        [languageApi.reducerPath]: languageApi.reducer,
        [partnerApi.reducerPath]: partnerApi.reducer,
        [newsGenreApi.reducerPath]: newsGenreApi.reducer,
        [managerItApi.reducerPath]: managerItApi.reducer,
        [productItApi.reducerPath]: productItApi.reducer,
        [developmentItApi.reducerPath]: developmentItApi.reducer,
        [tektraLabelingApi.reducerPath]: tektraLabelingApi.reducer,
        [procedureApi.reducerPath]: procedureApi.reducer,
        [uploadImageApi.reducerPath]: uploadImageApi.reducer,
        [serviceApi.reducerPath]: serviceApi.reducer,
        [feedbackApi.reducerPath]: feedbackApi.reducer,
        [newsApi.reducerPath]: newsApi.reducer,
        [recruitmentApi.reducerPath]: recruitmentApi.reducer,
        [generalApi.reducerPath]: generalApi.reducer,
        [generalFieldApi.reducerPath]: generalFieldApi.reducer,
        [generalQuantityApi.reducerPath]: generalQuantityApi.reducer,
        [officesApi.reducerPath]: officesApi.reducer,
        [slideApi.reducerPath]: slideApi.reducer,
    });

    const persistedReducer = persistReducer(persistConfig, reducers);

    const store = configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
            }).concat([
                loginApi.middleware,
                accountApi.middleware,
                languageApi.middleware,
                partnerApi.middleware,
                newsGenreApi.middleware,
                managerItApi.middleware,
                productItApi.middleware,
                developmentItApi.middleware,
                tektraLabelingApi.middleware,
                procedureApi.middleware,
                uploadImageApi.middleware,
                serviceApi.middleware,
                feedbackApi.middleware,
                newsApi.middleware,
                recruitmentApi.middleware,
                generalApi.middleware,
                generalFieldApi.middleware,
                generalQuantityApi.middleware,
                officesApi.middleware,
                slideApi.middleware,
            ]),
    });

    setupListeners(store.dispatch);

    return store;
};

export const store = makeStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
