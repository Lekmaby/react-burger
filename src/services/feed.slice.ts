import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Order} from "../types/order.ts";
import {WebsocketStatus} from "../enum/WebsocketStatus.enum.ts";

export interface FeedState {
    status: WebsocketStatus;
    orders: Order[];
    connectionError: string | null;
    total: number | null;
    totalToday: number | null;
}

export const initialState: FeedState = {
    status: WebsocketStatus.OFFLINE,
    orders: [],
    connectionError: null,
    total: null,
    totalToday: null,
}

export interface WsFeedResponse {
    success: boolean
    orders: Order[]
    total: number
    totalToday: number
}

export const wsConnect = createAction<string, "FEED_CONNECT">(
    "FEED_CONNECT"
);

export const wsDisconnect = createAction("FEED_DISCONNECT");

export const feedSlice = createSlice({
    name: 'feed',
    initialState,
    selectors: {
        getFeedWebsocketStatus: (state: FeedState) => state.status,
        getFeedOrders: (state: FeedState) => state.orders,
        getFeedTotal: (state: FeedState) => state.total,
        getFeedTotalToday: (state: FeedState) => state.totalToday,
    },
    reducers: {
        wsConnecting: (state) => {
            state.status = WebsocketStatus.CONNECTING;
        },
        wsOpen: (state) => {
            state.status = WebsocketStatus.ONLINE;
            state.connectionError = null;
        },
        wsClose: (state) => {
            state.status = WebsocketStatus.OFFLINE;
        },
        wsError: (state, action: PayloadAction<string>) => {
            state.connectionError = action.payload;
        },
        wsMessage: (state, action: PayloadAction<WsFeedResponse>) => {
            state.orders = action.payload.orders;
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
        }
    }
})

export const {wsConnecting, wsOpen, wsClose, wsError, wsMessage} = feedSlice.actions;
export const {getFeedWebsocketStatus, getFeedOrders, getFeedTotal, getFeedTotalToday} = feedSlice.selectors;

export default feedSlice;
