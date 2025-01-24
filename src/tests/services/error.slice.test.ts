import errorSlice, {ErrorState, initialState, resetError, setError} from '../../services/error.slice';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query';

describe('errorSlice', () => {
    it('should handle initial state', () => {
        expect(errorSlice.reducer(undefined, {type: 'unknown'})).toEqual(initialState);
    });

    it('should handle setError', () => {
        const errorMessage = 'Произошла ошибка';

        expect(errorSlice.reducer(initialState, setError(errorMessage))).toEqual({
            ...initialState, error: errorMessage
        })
    });

    it('should handle setQueryError with valid FetchBaseQueryError', () => {
        const queryError: FetchBaseQueryError = {
            status: 400,
            data: {message: 'Bad Request'},
        };

        expect(errorSlice.reducer(initialState, errorSlice.actions.setQueryError(queryError))).toEqual({
            ...initialState, error: JSON.stringify(queryError.data, null, 2)
        })
    });

    it('should handle setQueryError with undefined', () => {
        expect(errorSlice.reducer(initialState, errorSlice.actions.setQueryError(undefined))).toEqual({
            ...initialState, error: 'Неизвестная ошибка'
        })
    });

    it('should handle resetError', () => {
        const stateWithError: ErrorState = {
            ...initialState,
            error: 'Произошла ошибка',
        };

        expect(errorSlice.reducer(stateWithError, resetError())).toEqual({
            ...initialState
        })
    });

    it('should handle orderApi.addOrder.matchRejected extraReducer', () => {
        const queryError: FetchBaseQueryError = {
            status: 400,
            data: {
                success: false,
                message: 'Ingredient ids must be provided'
            }
        };

        const action = {
            type: 'orderApi/executeMutation/rejected',
            payload: queryError,
            meta: {
                baseQueryMeta: {
                    request: {},
                    response: {}
                },
                RTK_autoBatch: true,
                arg: {
                    type: 'mutation',
                    endpointName: 'addOrder',
                    originalArgs: [
                        '643d69a5c3f7b9001cfa093d',
                        '643d69a5c3f7b9001cfa093e',
                        '643d69a5c3f7b9001cfa093d'
                    ],
                    track: true
                },
                requestId: 'OA0731QYryhSfFTiBnPpj',
                rejectedWithValue: true,
                requestStatus: 'rejected',
                aborted: false,
                condition: false
            },
            error: {
                message: 'Rejected'
            }
        };

        expect(errorSlice.reducer(initialState, action)).toEqual({
            ...initialState, error: JSON.stringify(queryError.data, null, 2)
        })
    });

    it('should handle ingredientApi.getIngredients.matchRejected extraReducer', () => {
        const queryError: FetchBaseQueryError = {
            status: 404,
            data: {message: 'Ingredients Not Found'},
        };

        const action = {
            type: 'ingredientApi/executeQuery/rejected',
            payload: queryError,
            meta: {
                baseQueryMeta: {
                    request: {},
                    response: {}
                },
                RTK_autoBatch: true,
                arg: {
                    type: 'query',
                    subscribe: true,
                    subscriptionOptions: {
                        pollingInterval: 0,
                        skipPollingIfUnfocused: false
                    },
                    endpointName: 'getIngredients',
                    queryCacheKey: 'getIngredients(undefined)'
                },
                requestId: 'OA0731QYryhSfFTiBnPpj',
                rejectedWithValue: true,
                requestStatus: 'rejected',
                aborted: false,
                condition: false
            },
            error: {
                message: 'Rejected'
            }
        };

        expect(errorSlice.reducer(initialState, action)).toEqual({
            ...initialState, error: JSON.stringify(queryError.data, null, 2)
        })
    });
});