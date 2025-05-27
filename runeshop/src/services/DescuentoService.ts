// services/DescuentoService.ts
import axios from 'axios';
import { BackendClient } from './BackendClient';

export class DescuentoService extends BackendClient {
  constructor() {
    super('descuento');
  }

  async getAllDescuentos(): Promise<any> {
    const response = await axios.get(`${this.baseUrl}/`);
    return response.data;
  }
}

export class DetalleDescuentoService extends BackendClient {
  constructor() {
    super('detalle');
  }

  async agregarDescuento(detalleId: number, descuentoId: number, finDescuento: string): Promise<any> {
    const response = await axios.put(`${this.baseUrl}/agregarDescuento?detalleId=${detalleId}&descuentoId=${descuentoId}&finDescuento=${finDescuento}`);
    return response.data;
  }
}
