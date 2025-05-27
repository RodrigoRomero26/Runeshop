
import axios from 'axios';
import { BackendClient } from './BackendClient';

export class OrdenCompraService extends BackendClient {
  constructor() {
    super('orden-compra');
  }

  async crearOrdenCompra(usuarioDireccionId: number, detallesId: string, body: any): Promise<any> {
    const response = await axios.post(`${this.baseUrl}/crear?usuarioDireccionId=${usuarioDireccionId}&detallesId=${detallesId}`, body);
    return response.data;
  }

  async getAllOrdenes(): Promise<any> {
    const response = await axios.get(`${this.baseUrl}/`);
    return response.data;
  }
}
