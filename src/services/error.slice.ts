import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {orderApi} from "./orders.api.ts";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {ingredientApi} from "./ingredient.api.ts";

interface ErrorState {
    error: string | null
}

const initialState: ErrorState = {
    error: null
}

export const errorSlice = createSlice({
    name: 'error',
    initialState,
    selectors: {
        getError: state => state.error,
    },
    reducers: {
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        setQueryError: (state, action: PayloadAction<FetchBaseQueryError | undefined>) => {
            state.error = action.payload ? JSON.stringify(action.payload.data, null, 2) : 'Неизвестная ошибка';
        },
        resetError: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            orderApi.endpoints.addOrder.matchRejected,
            (state, action) => {
                errorSlice.caseReducers.setQueryError(state, action);
            }
        )
        builder.addMatcher(
            ingredientApi.endpoints.getIngredients.matchRejected,
            (state, action) => {
                errorSlice.caseReducers.setQueryError(state, action);
            }
        )
    },
})

export const {setError, resetError} = errorSlice.actions
export const {getError} = errorSlice.selectors

export default errorSlice