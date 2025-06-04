
import api from '../api/api';

export class DescuentoService {
  static async getDescuentos(): Promise<any[]> {
    try {
      const res = await api.get('/descuento');
      return res.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

