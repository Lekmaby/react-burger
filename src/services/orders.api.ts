import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import config from "../utils/config.ts";
import {Order} from "../types/order.ts";
import {getBaseQueryWithReauth} from "../utils/refreshToken.ts";

const baseQuery = fetchBaseQuery({
    baseUrl: config.api,
    prepareHeaders: (headers) => {
        headers.set("Content-Type", "application/json");
        headers.set("authorization", localStorage.getItem("accessToken") ?? '');

        return headers;
    }
});

export const orderApi = createApi({
    reducerPath: 'orderApi',
    tagTypes: ['Order'],
    baseQuery: getBaseQueryWithReauth(baseQuery),
    endpoints: (builder) => ({
        addOrder: builder.mutation({
            query: (ingredients: string[]) => ({
                url: '/orders',
                method: 'POST',
                body: JSON.stringify({ingredients})
            }),
            transformResponse: (rawResult: { success: boolean, name: string, order: Order }): Order | null => {
                return rawResult.success ? rawResult.order : null;
            },
        }),
    }),
})

export const {useAddOrderMutation} = orderApi;
