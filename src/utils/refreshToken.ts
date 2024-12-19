import mem from "mem";

import auth from "./auth.ts";
import {TokenResponse} from "../types/tokenResponse.ts";
import {BaseQueryFn, FetchArgs, FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {DefaultResponse} from "../types/defaultResponse.ts";

const refreshTokenFn = async (): Promise<TokenResponse | undefined> => {
    try {
        const refreshData: TokenResponse = await auth.token();

        if (!refreshData.success) {
            return Promise.reject(refreshData);
        }

        localStorage.setItem("refreshToken", refreshData.refreshToken);
        localStorage.setItem("accessToken", refreshData.accessToken);

        return refreshData;
    } catch {
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");
    }
};

const maxAge: number = 10000;

export const memoizedRefreshToken = mem(refreshTokenFn, {
    maxAge,
});

// for RTK query
export const getBaseQueryWithReauth = (
    baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>
): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => {
    return async function (args, api, extraOptions) {
        let result = await baseQuery(args, api, extraOptions)

        if (result.error && ((result.error.status === 401 || result.error.status === 403) && (result.error?.data as DefaultResponse)?.message === "jwt expired")) {
            const refreshData = await memoizedRefreshToken()

            if (refreshData) {
                result = await baseQuery(args, api, extraOptions)
            }
        }
        return result
    }
}