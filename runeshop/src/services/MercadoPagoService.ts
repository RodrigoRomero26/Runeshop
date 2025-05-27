
import axios from 'axios';
import { BackendClient } from './BackendClient';

export class MercadoPagoService extends BackendClient {
  constructor() {
    super('api');
  }

  async getMercadoPagoLink(usuarioDireccionId: number, detallesId: string): Promise<any> {
    const response = await axios.get(`${this.baseUrl}/mercado`, { params: { usuarioDireccionId, detallesId } });
    return response.data;
  }
}
