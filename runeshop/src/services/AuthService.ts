// src/services/AuthService.ts
import api from '../api/api';

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

export interface LoginResponse {
  token: string;
}

export class AuthService {
  static async login(data: LoginRequest): Promise<LoginResponse | null> {
    try {
      const res = await api.post<LoginResponse>('/auth/login', data);
      localStorage.setItem('token', res.data.token);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async register(data: RegisterRequest): Promise<any | null> {
    try {
      const res = await api.post('/auth/register', data);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static logout(): void {
    localStorage.removeItem('token');
    window.location.reload();
  }
}
