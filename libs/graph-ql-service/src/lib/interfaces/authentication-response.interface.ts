export interface AuthenticationResponse {
    login: {
        accessToken: string;
        refreshToken?: string;
    };
}
