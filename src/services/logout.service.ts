import axios from "axios";

export class LogoutService {
    private apiUrl = "http://localhost:8080/api/v1/auth/logout";

    async logout(refreshToken: string): Promise<void> {
        await axios.post(
            this.apiUrl,
            {},
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
}