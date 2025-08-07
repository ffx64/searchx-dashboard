import { AuthRequestType, AuthResponseType } from "@/types/auth.type";
import { UserCache } from "@/types/user.type";
import axios from "axios";
import { useRouter } from "next/navigation";

export class AuthService {
    private url = "http://localhost:8080/api/v1/auth";

    async login(credentials: AuthRequestType): Promise<AuthResponseType> {
        const response = await axios.post<AuthResponseType>(`${this.url}/login`, credentials);

        if (response.status === 200 && response.data.access_token && response.data.refresh_token) {
            sessionStorage.setItem("token", response.data.access_token);
            sessionStorage.setItem("refresh_token", response.data.refresh_token);

            const meResponse = await axios.get<UserCache>(this.url+"/me", {
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

    async logout(): Promise<void> {
        const refreshToken = sessionStorage.getItem("refresh_token");

        if( !refreshToken) {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("refresh_token");
            sessionStorage.removeItem("username");
            window.location.href = "/";
            return;
        }

        await axios.post(`${this.url}/logout`, {},
            {
                headers: {
                    Authorization: `Bearer ${refreshToken}`,
                },
            }
        );

        sessionStorage.removeItem("token");
        sessionStorage.removeItem("refresh_token");
        sessionStorage.removeItem("username");

        window.location.href = "/";
    }

    async refreshToken(): Promise<string | null> {
        const token = sessionStorage.getItem("token");
        const refreshToken = sessionStorage.getItem("refresh_token");

        if (!token || !refreshToken) {
            sessionStorage.clear();
            window.location.href = "/";
            return null;
        }

        try {
            const response = await axios.post<AuthResponseType>(`${this.url}/refresh`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Refresh-Token": refreshToken,
                },
            });

            if (response.status === 200 && response.data.access_token) {
                sessionStorage.setItem("token", response.data.access_token);
                return response.data.access_token;
            }
        } catch (error) {
            console.error("Failed to refresh token:", error);
            return null;
        }

        return null;
    }
}