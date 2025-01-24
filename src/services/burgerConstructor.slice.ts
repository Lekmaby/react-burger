import type {ActionReducerMapBuilder, PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {Ingredient} from "../types/ingredient.ts";
import {v4 as uuidv4} from 'uuid';
import {orderApi} from "./orders.api.ts";
import {IngredientTypeEnum} from "../enum/ingredient-type.enum.ts";

export interface BurgerConstructorState {
    bun: Ingredient | null,
    ingredients: Ingredient[]
}

export const initialState: BurgerConstructorState = {
    bun: null,
    ingredients: [],
}

export const burgerConstructorSlice = createSlice({
    name: 'burgerConstructor',
    initialState,
    selectors: {
        getSelectedBun: (state: BurgerConstructorState) => state.bun,
        getSelectedIngredients: (state: BurgerConstructorState) => state.ingredients,
    },
    reducers: {
        addIngredient: {
            reducer: (state: BurgerConstructorState, action: PayloadAction<Ingredient>) => {
                if (action.payload.type === IngredientTypeEnum.BUN) {
                    state.bun = action.payload;
                } else {
                    state.ingredients.push(action.payload);
                }
            },
            prepare: (ingredient: Ingredient) => {
                return {payload: {...ingredient, _key: uuidv4()}};
            }
        },
        removeIngredient: (state: BurgerConstructorState, action: PayloadAction<Ingredient>) => {
            state.ingredients = state.ingredients.filter(x => x._key !== action.payload._key);
        },
        moveIngredient: (state: BurgerConstructorState, action: PayloadAction<{
            fromIndex: number,
            toIndex: number
        }>) => {
            state.ingredients.splice(action.payload.toIndex, 0, state.ingredients.splice(action.payload.fromIndex, 1)[0])
        }
    },
    extraReducers: (builder: ActionReducerMapBuilder<BurgerConstructorState>) => {
        builder.addMatcher(
            orderApi.endpoints.addOrder.matchFulfilled,
            () => {
                return initialState;
            }
        )
    },
})

export const {
    addIngredient,
    removeIngredient,
    moveIngredient
} = burgerConstructorSlice.actions;

export const {getSelectedBun, getSelectedIngredients} = burgerConstructorSlice.selectors;


export default burgerConstructorSlice;
