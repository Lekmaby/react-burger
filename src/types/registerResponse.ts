import {User} from "./user.ts";
import {DefaultResponse} from "./defaultResponse.ts";

export type RegisterResponse = {
    user: User,
    accessToken: string,
    refreshToken: string
} & DefaultResponse;
