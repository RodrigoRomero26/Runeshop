// src/services/OrdenCompraService.ts
import api from '../api/api';

export class OrdenCompraService {
  static async crearOrden(usuarioDireccionId: number, detallesId: number[]): Promise<any | null> {
    try {
      const res = await api.post(
        `/orden-compra/crear?usuarioDireccionId=${usuarioDireccionId}&detallesId=${detallesId.join(',')}`
      );
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async getOrdenes(): Promise<any[]> {
    try {
      const res = await api.get('/ordenCompra');
      return res.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
 