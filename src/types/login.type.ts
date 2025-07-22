export type LoginResponseType = {
    access_token: string;
    refresh_token: string;
}

export type LoginRequestType = {
    username: string;
    password: string;
}