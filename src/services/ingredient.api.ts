import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import config from "../utils/config.ts";
import {Ingredient} from "../types/ingredient.ts";

export const ingredientApi = createApi({
    reducerPath: 'ingredientApi',
    tagTypes: ['Ingredients'],
    baseQuery: fetchBaseQuery({baseUrl: config.api}),
    endpoints: (builder) => ({
        getIngredients: builder.query<Ingredient[], void>({
            query: () => `/ingredients`,
            transformResponse: (rawResult: { success: boolean, data: Ingredient[] }): Ingredient[] => {
                return rawResult.success ? rawResult.data : [];
            },
            providesTags: (result: Ingredient[] | undefined) =>
                result
                    ? [
                        ...result.map(({_id}: Ingredient) => ({type: 'Ingredients' as const, id: _id})),
                        {type: 'Ingredients', id: 'LIST'},
                    ]
                    : [{type: 'Ingredients', id: 'LIST'}],
        }),
    }),
})

export const {useGetIngredientsQuery} = ingredientApi;
