import { DetalleService } from '../services/DetalleService';
import type { IDetalleUpdate } from '../types/DTOs/IDetalleUpdate';
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

export const updateDetalleController = async (detalle: IDetalleUpdate): Promise<IDetalle | null> => {
  try {
    const updatedDetalle = await DetalleService.updateDetalle(detalle);
    return updatedDetalle;
  } catch (error) {
    console.error("Error en updateDetalleController:", error);
    return null;
  }
};
