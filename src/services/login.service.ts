import { LoginRequestType, LoginResponseType } from "@/types/login.type";
import { UserCache } from "@/types/user.type";
import axios from "axios";

export class LoginService {
    private apiUrl = "http://localhost:8080/api/v1/auth/login";
    private meUrl = "http://localhost:8080/api/v1/auth/me";

    async login(credentials: LoginRequestType): Promise<LoginResponseType> {
        const response = await axios.post<LoginResponseType>(this.apiUrl, credentials);

        if (response.status === 200 && response.data.access_token && response.data.refresh_token) {
            sessionStorage.setItem("token", response.data.access_token);
            sessionStorage.setItem("refresh_token", response.data.refresh_token);

            const meResponse = await axios.get<UserCache>(this.meUrl, {
                headers: {
                    Authorization: `Bearer ${response.data.access_token}`,
                },
            });

            sessionStorage.setItem("username", meResponse.data.username);
            sessionStorage.setItem("last_login", meResponse.data.last_login);    

            window.location.href = "/";
        }

        return response.data;
    }
}