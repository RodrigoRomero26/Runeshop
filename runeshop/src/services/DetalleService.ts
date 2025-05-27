
import axios from 'axios';
import { BackendClient } from './BackendClient';

export class DetalleService extends BackendClient {
  constructor() {
    super('detalle');
  }

  async getAllDetalles(): Promise<any> {
    const response = await axios.get(`${this.baseUrl}/`);
    return response.data;
  }
}
