import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {Ingredient} from "../types/ingredient.ts";
import {ingredientApi} from "./ingredient.api.ts";

export interface IngredientState {
    loaded: boolean,
    ingredient: Record<string, Ingredient>
}

export const initialState: IngredientState = {
    loaded: false,
    ingredient: {}
}

export const ingredientSlice = createSlice({
    name: 'ingredient',
    initialState,
    selectors: {
        getIngredients: (state: IngredientState) => state.ingredient,
        getIngredientsIsLoaded: (state: IngredientState) => state.loaded,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            ingredientApi.endpoints.getIngredients.matchFulfilled,
            (state: IngredientState, {payload}: PayloadAction<Ingredient[] | null>) => {
                state.loaded = true;
                payload?.forEach((ingredient: Ingredient) => {
                    state.ingredient[ingredient._id] = ingredient;
                })
            }
        )
    },
})

export const {getIngredients, getIngredientsIsLoaded} = ingredientSlice.selectors;

export default ingredientSlice;
