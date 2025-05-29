// src/services/PrecioService.ts
import api from '../api/api';

export interface Precio {
  precioCompra: number;
  precioVenta: number;
}

export class PrecioService {
  static async crearPrecio(data: Precio): Promise<any | null> {
    try {
      const res = await api.post('/precio', data);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async getPrecios(): Promise<any[]> {
    try {
      const res = await api.get('/precio');
      return res.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

