import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {Order} from "../types/order.ts";
import {orderApi} from "./orders.api.ts";

interface OrderState {
    opened: boolean,
    order: Order | null
}

const initialState: OrderState = {
    opened: false,
    order: null
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    selectors: {
        getOrderIsOpened: state => state.opened,
        getOrder: state => state.order,
    },
    reducers: {
        setOrder: (state, action: PayloadAction<Order>) => {
            state.opened = true;
            state.order = action.payload;
        },
        orderClosed: (state) => {
            state.opened = false;
            state.order = null;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            orderApi.endpoints.addOrder.matchFulfilled,
            (state, {payload}: PayloadAction<Order | null>) => {
                state.opened = true;
                state.order = payload;
            }
        )
    },
})

export const {setOrder, orderClosed} = orderSlice.actions;
export const {getOrderIsOpened, getOrder} = orderSlice.selectors;

export default orderSlice;
