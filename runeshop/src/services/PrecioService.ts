
import axios from 'axios';
import { BackendClient } from './BackendClient';

export class PrecioService extends BackendClient {
  constructor() {
    super('precio');
  }

  async getAllPrecios(): Promise<any> {
    const response = await axios.get(`${this.baseUrl}/`);
    return response.data;
  }

  async crearPrecio(data: any): Promise<any> {
    const response = await axios.post(`${this.baseUrl}/`, data);
    return response.data;
  }
}
