import { DireccionService } from '../services/DireccionService';

const direccionService = new DireccionService();

export const getDireccionesController = async (): Promise<any[]> => {
  try {
    const direcciones = await direccionService.getAllDirecciones();
    return direcciones || [];
  } catch (error) {
    console.error("Error en getDireccionesController:", error);
    return [];
  }
};

