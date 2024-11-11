import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {Ingredient} from "../types/ingredient.ts";

interface IngredientState {
    opened: boolean,
    ingredient: Ingredient | null
}

const initialState: IngredientState = {
    opened: false,
    ingredient: null
}

export const ingredientSlice = createSlice({
    name: 'ingredient',
    initialState,
    selectors: {
        getIngredientIsOpened: state => state.opened,
        getIngredient: state => state.ingredient,
    },
    reducers: {
        ingredientSelected: (state, action: PayloadAction<Ingredient>) => {
            state.opened = true;
            state.ingredient = action.payload;
        },
        ingredientClosed: (state) => {
            state.opened = false;
            state.ingredient = null;
        },
    },
})

export const {ingredientSelected, ingredientClosed} = ingredientSlice.actions;
export const {getIngredientIsOpened, getIngredient} = ingredientSlice.selectors;

export default ingredientSlice;
