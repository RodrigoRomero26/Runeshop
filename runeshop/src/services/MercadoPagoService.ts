// src/services/MercadoPagoService.ts
import api from '../api/api';

export class MercadoPagoService {
  static async getLinkPago(usuarioDireccionId: number, detallesId: number[]): Promise<any | null> {
    try {
      const res = await api.get(`/api/mercado`, {
        params: {
          usuarioDireccionId,
          detallesId: detallesId.join(',')
        }
      });
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
