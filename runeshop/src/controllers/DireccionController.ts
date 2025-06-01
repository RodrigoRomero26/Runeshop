import { DireccionService } from '../services/DireccionService';
import type { IDireccion } from '../types/IDireccion';

export const getDireccionesController = async (): Promise<IDireccion[]> => {
  try {
    const direcciones = await DireccionService.getDirecciones();
    return direcciones || [];
  } catch (error) {
    console.error("Error en getDireccionesController:", error);
    return [];
  }
};

