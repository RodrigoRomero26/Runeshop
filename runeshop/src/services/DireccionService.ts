
import api from '../api/api';

export class DireccionService {
  static async getDireccionesPorUsuario(usuarioId: number): Promise<any[]> {
    try {
      const res = await api.get(`/perfil/usuarios/${usuarioId}/direcciones`);
      return res.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  static async getDirecciones(): Promise<any[]> {
    try {
      const res = await api.get('/direccion');
      return res.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
