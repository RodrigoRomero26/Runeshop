// src/services/TalleService.ts
import api from '../api/api';

export class TalleService {
  static async getTalles(): Promise<any[]> {
    try {
      const res = await api.get('/talle');
      return res.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
