import ingredientSlice, {initialState} from '../../services/ingredient.slice.ts';
import {Ingredient} from "../../types/ingredient.ts";
import {IngredientTypeEnum} from "../../enum/ingredient-type.enum.ts";

describe('ingredientSlice', () => {
    it('should return the initial state', () => {
        expect(ingredientSlice.reducer(undefined, {type: 'unknown'})).toEqual(initialState);
    });

    it('should handle getIngredients.matchFulfilled', () => {
        const ingredients: Ingredient[] = [
            {
                _id: '643d69a5c3f7b9001cfa093c',
                name: 'Краторная булка N-200i',
                type: IngredientTypeEnum.BUN,
                proteins: 80,
                fat: 24,
                carbohydrates: 53,
                calories: 420,
                price: 1255,
                image: 'https://code.s3.yandex.net/react/code/bun-02.png',
                image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
                image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
                __v: 0
            },
            {
                _id: '643d69a5c3f7b9001cfa0941',
                name: 'Биокотлета из марсианской Магнолии',
                type: IngredientTypeEnum.MAIN,
                proteins: 420,
                fat: 142,
                carbohydrates: 242,
                calories: 4242,
                price: 424,
                image: 'https://code.s3.yandex.net/react/code/meat-01.png',
                image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
                image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
                __v: 0
            },
        ];

        const action = {
            type: 'ingredientApi/executeQuery/fulfilled',
            payload: ingredients,
            meta: {
                fulfilledTimeStamp: 1737711012129,
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
                requestId: 'YbK8mAQfyyaKPE4TM_h4X',
                requestStatus: 'fulfilled'
            }
        };

        expect(ingredientSlice.reducer(initialState, action)).toEqual({
            ...initialState, loaded: true, ingredient: {
                '643d69a5c3f7b9001cfa093c': ingredients[0],
                '643d69a5c3f7b9001cfa0941': ingredients[1],
            }
        })
    });
});