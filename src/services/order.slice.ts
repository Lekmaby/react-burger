import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {Order} from "../types/order.ts";
import {orderApi} from "./orders.api.ts";

export interface OrderState {
    opened: boolean,
    order: Order | null
}

export const initialState: OrderState = {
    opened: false,
    order: null
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    selectors: {
        getOrderIsOpened: (state: OrderState) => state.opened,
        getOrder: (state: OrderState) => state.order,
    },
    reducers: {
        setOrder: (state: OrderState, action: PayloadAction<Order>) => {
            state.opened = true;
            state.order = action.payload;
        },
        orderClosed: (state: OrderState) => {
            state.opened = false;
            state.order = null;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            orderApi.endpoints.addOrder.matchFulfilled,
            (state: OrderState, {payload}: PayloadAction<Order | null>) => {
                state.opened = true;
                state.order = payload;
            }
        );

        builder.addMatcher(
            orderApi.endpoints.getOrder.matchFulfilled,
            (state: OrderState, {payload}: PayloadAction<Order | null>) => {
                if (payload) {
                    state.order = payload;
                }
            }
        );
    },
})

export const {setOrder, orderClosed} = orderSlice.actions;
export const {getOrderIsOpened, getOrder} = orderSlice.selectors;

export default orderSlice;
