// src/services/UsuarioService.ts
import api from '../api/api';

export class UsuarioService {
  static async getUsuarios(): Promise<any[]> {
    try {
      const res = await api.get('/usuario');
      return res.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
