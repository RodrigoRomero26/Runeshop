
import axios from 'axios';
import { BackendClient } from './BackendClient';

export class UsuarioService extends BackendClient {
  constructor() {
    super('usuario');
  }

  async getAllUsuarios(): Promise<any> {
    const response = await axios.get(`${this.baseUrl}/`);
    return response.data;
  }
}
