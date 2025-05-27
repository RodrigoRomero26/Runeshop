import { DetalleService } from '../services/DetalleService';

const detalleService = new DetalleService();

export const getDetallesController = async (): Promise<any[]> => {
  try {
    const detalles = await detalleService.getAllDetalles();
    return detalles || [];
  } catch (error) {
    console.error("Error en getDetallesController:", error);
    return [];
  }
};
