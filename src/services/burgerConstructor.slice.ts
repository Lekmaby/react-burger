import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {Ingredient} from "../types/ingredient.ts";
import {v4 as uuidv4} from 'uuid';
import {orderApi} from "./orders.api.ts";
import {IngredientTypeEnum} from "../enum/ingredient-type.enum.ts";

interface BurgerConstructorState {
    bun: Ingredient | null,
    ingredients: Ingredient[]
}

const initialState: BurgerConstructorState = {
    bun: null,
    ingredients: [],
}

export const burgerConstructorSlice = createSlice({
    name: 'burgerConstructor',
    initialState,
    selectors: {
        getSelectedBun: state => state.bun,
        getSelectedIngredients: state => state.ingredients,
    },
    reducers: {
        addIngredient: {
            reducer: (state, action: PayloadAction<Ingredient>) => {
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
        removeIngredient: (state, action: PayloadAction<Ingredient>) => {
            state.ingredients = state.ingredients.filter(x => x._key !== action.payload._key);
        },
        moveIngredient: (state, action: PayloadAction<{ fromIndex: number, toIndex: number }>) => {
            state.ingredients.splice(action.payload.toIndex, 0, state.ingredients.splice(action.payload.fromIndex, 1)[0])
        }
    },
    extraReducers: (builder) => {
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
