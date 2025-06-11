
import api from '../api/api';

export interface Categoria {
  id: number;
  nombre: string;
}

export class CategoriaService {
  static async crearCategoria(nombre: string): Promise<Categoria | null> {
    try {
      const res = await api.post<Categoria>('/categoria', { nombre });
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async getCategorias(): Promise<Categoria[]> {
    try {
      const res = await api.get<Categoria[]>('/categoria');
      return res.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
