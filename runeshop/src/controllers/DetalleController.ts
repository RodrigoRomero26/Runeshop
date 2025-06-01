import { DetalleService } from '../services/DetalleService';
import type { IDetalle } from '../types/IDetalle';

export const getDetallesController = async (): Promise<IDetalle[]> => {
  try {
    const detalles = await DetalleService.getDetalles();
    return detalles || [];
  } catch (error) {
    console.error("Error en getDetallesController:", error);
    return [];
  }
};
