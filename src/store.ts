import {combineSlices, configureStore} from '@reduxjs/toolkit'
import {setupListeners} from '@reduxjs/toolkit/query'
import {ingredientApi} from './services/ingredient.api'
import burgerConstructorSlice from "./services/burgerConstructor.slice.ts";
import orderSlice from "./services/order.slice.ts";
import {orderApi} from "./services/orders.api.ts";
import errorSlice from "./services/error.slice.ts";
import userSlice from "./services/user.slice.ts";
import ingredientSlice from "./services/ingredient.slice.ts";
import feedSlice, {
    wsClose,
    wsConnect,
    wsConnecting,
    wsDisconnect,
    wsError,
    wsMessage,
    wsOpen
} from "./services/feed.slice.ts";
import {socketMiddleware} from "./services/socket.middleware.ts";
import profileFeedSlice, {
    wsProfileFeedClose,
    wsProfileFeedConnect,
    wsProfileFeedConnecting,
    wsProfileFeedDisconnect,
    wsProfileFeedError,
    wsProfileFeedMessage,
    wsProfileFeedOpen
} from "./services/profileFeed.slice.ts";

const rootReducer = combineSlices(
    ingredientApi, orderApi,
    burgerConstructorSlice, orderSlice, ingredientSlice, errorSlice, userSlice, feedSlice, profileFeedSlice
);

const feedMiddleware = socketMiddleware({
    connect: wsConnect,
    disconnect: wsDisconnect,
    onConnecting: wsConnecting,
    onOpen: wsOpen,
    onClose: wsClose,
    onError: wsError,
    onMessage: wsMessage,
});

const profileFeedMiddleware = socketMiddleware({
    connect: wsProfileFeedConnect,
    disconnect: wsProfileFeedDisconnect,
    onConnecting: wsProfileFeedConnecting,
    onOpen: wsProfileFeedOpen,
    onClose: wsProfileFeedClose,
    onError: wsProfileFeedError,
    onMessage: wsProfileFeedMessage,
}, true);

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            ingredientApi.middleware, orderApi.middleware,
            feedMiddleware, profileFeedMiddleware
        ),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
