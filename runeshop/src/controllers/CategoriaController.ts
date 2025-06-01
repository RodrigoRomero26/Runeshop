
import { CategoriaService } from '../services/CategoriaService';
import type { ICategoria } from '../types/ICategoria';

export const getCategoriasController = async (): Promise<ICategoria[]> => {
  try {
    const categorias = await CategoriaService.getCategorias();
    return categorias || [];
  } catch (error) {
    console.error("Error en getCategoriasController:", error);
    return [];
  }
};

export const createCategoriaController = async (data:ICategoria): Promise<any | null> => {
  try {
    const categoria = await CategoriaService.crearCategoria(data.nombre);
    return categoria;
  } catch (error) {
    console.error("Error en createCategoriaController:", error);
    return null;
  }
};
