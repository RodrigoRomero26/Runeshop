
export interface ILoginResponse {
    token: string;
    id: number;
    refreshToken: string;
    rol: "USER" | "ADMIN";
}