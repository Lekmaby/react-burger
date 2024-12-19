import {User} from "./user.ts";
import {DefaultResponse} from "./defaultResponse.ts";

export type UserResponse = {
    user: User
} & DefaultResponse;
