import api from "../api/api";
import type { ILoginResponse } from "../types/ILoginResponse";

export interface LoginRequest {
	nombreUsuario: string;
	contrasenia: string;
}

export interface RegisterRequest extends LoginRequest {
	nombre: string;
	apellido: string;
	dni: string;
	email: string;
}



export class AuthService {
	static async login(data: LoginRequest): Promise<ILoginResponse | null> {
		try {
			const res = await api.post<ILoginResponse>("/auth/login", data);
			localStorage.setItem("token", res.data.token);
			localStorage.setItem("userId", res.data.id.toString());
			localStorage.setItem("refreshToken", res.data.refreshToken);
			return res.data;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	static async register(data: RegisterRequest): Promise<any> {
		try {
			const res = await api.post("/auth/register", data);
			return res.data;
		} catch (error: any) {
			if (error.response && error.response.data && error.response.data.error) {
				throw new Error(error.response.data.error);
			}
			throw new Error("Error inesperado al intentar registrarse");
		}
	}

	static logout(): void {
		localStorage.removeItem("token");
		window.location.reload();
	}
}
