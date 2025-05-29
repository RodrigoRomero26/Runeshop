// src/services/ImagenService.ts
import api from '../api/api';

export class ImagenService {
  static async getImagenes(): Promise<any[]> {
    try {
      const res = await api.get('/imagen');
      return res.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
