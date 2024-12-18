import {DefaultResponse} from "./defaultResponse.ts";

export type TokenResponse = {
    accessToken: string,
    refreshToken: string
} & DefaultResponse;
