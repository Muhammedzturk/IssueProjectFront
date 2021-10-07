import client from "axios";

class AuthService {
    login(loginQuery) {
        return client
            .post(process.env.VUE_APP_API_URL + process.env.VUE_APP_API_NAME + "/user/login", loginQuery)
            .then((response) => {
                if (response.data.Success) {
                    this.addToken(response.data.Payload);
                }
                return response.data;
            });
    }

    logout() {
        this.clearTokens();
    }

    getNewToken() {
        let refreshQuery = {
            grantType: "refresh_token",
            refreshToken: localStorage.getItem("user.refreshToken"),
            clientId: "2BissWeb",
            identityNo: "",
            password: ""
        };

        return client.post(
            process.env.VUE_APP_API_URL + process.env.VUE_APP_API_NAME + "/client/user/login",
            refreshQuery
        );
    }

    addToken(payload) {
        localStorage.setItem("user.name", payload.Name);
        localStorage.setItem("user.role", payload.Role);
        localStorage.setItem("user.accessToken", payload.AccessToken);
        localStorage.setItem("user.refreshToken", payload.RefreshToken);
    }

    getName() {
        return localStorage.getItem("user.name");
    }

    getRole() {
        return localStorage.getItem("user.role");
    }

    getToken() {
        return localStorage.getItem("user.accessToken");
    }

    isLoggedIn() {
        return !!(this.getToken() || "");
    }

    clearTokens() {
        localStorage.removeItem("user");
        localStorage.removeItem("user.accessToken");
        localStorage.removeItem("user.refreshToken");
    }
}

export default new AuthService();
