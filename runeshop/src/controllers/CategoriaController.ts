
import { CategoriaService } from '../services/CategoriaService';

const categoriaService = new CategoriaService();

export const getCategoriasController = async (): Promise<any[]> => {
  try {
    const categorias = await categoriaService.getAllCategorias();
    return categorias || [];
  } catch (error) {
    console.error("Error en getCategoriasController:", error);
    return [];
  }
};

export const createCategoriaController = async (data: { nombre: string }): Promise<any | null> => {
  try {
    const categoria = await categoriaService.createCategoria(data);
    return categoria;
  } catch (error) {
    console.error("Error en createCategoriaController:", error);
    return null;
  }
};
