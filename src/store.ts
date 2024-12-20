import {combineSlices, configureStore} from '@reduxjs/toolkit'
import {setupListeners} from '@reduxjs/toolkit/query'
import {ingredientApi} from './services/ingredient.api'
import burgerConstructorSlice from "./services/burgerConstructor.slice.ts";
import orderSlice from "./services/order.slice.ts";
import {orderApi} from "./services/orders.api.ts";
import errorSlice from "./services/error.slice.ts";
import userSlice from "./services/user.slice.ts";

const rootReducer = combineSlices(
    ingredientApi, orderApi,
    burgerConstructorSlice, orderSlice, errorSlice, userSlice
);

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(ingredientApi.middleware, orderApi.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
