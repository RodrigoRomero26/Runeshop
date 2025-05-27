
import axios from 'axios';
import { BackendClient } from './BackendClient';

export class AuthService extends BackendClient {
  constructor() {
    super('auth');
  }

  async login(data: { nombreUsuario: string; contrasenia: string }): Promise<any> {
    const response = await axios.post(`${this.baseUrl}/login`, data);
    return response.data;
  }

  async register(data: any): Promise<any> {
    const response = await axios.post(`${this.baseUrl}/register`, data);
    return response.data;
  }
}
