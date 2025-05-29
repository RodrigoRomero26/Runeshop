// src/services/PerfilService.ts
import api from '../api/api';

export class PerfilService {
  static async getPerfil(): Promise<any[]> {
    try {
      const res = await api.get('/perfil');
      return res.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  static async getDireccionesPorUsuario(usuarioId: number): Promise<any[]> {
    try {
      const res = await api.get(`/perfil/usuarios/${usuarioId}/direcciones`);
      return res.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
