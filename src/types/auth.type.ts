export type AuthResponseType = {
    access_token: string;
    refresh_token: string;
}

export type AuthRequestType = {
    username: string;
    password: string;
}