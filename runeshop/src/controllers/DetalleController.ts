import { DetalleService } from '../services/DetalleService';
import type { IDetalleCreate } from '../types/DTOs/IDetalleCreate';
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

export const agregarDetalleController = async (
  detalle: IDetalleCreate,
  prodID: number,
  imagen: File[]
): Promise<IDetalle | null> => {
  try {
    const newDetalle = await DetalleService.agregarDetalle(detalle, prodID, imagen);
    return newDetalle;
  } catch (error) {
    console.error("Error en agregarDetalleController:", error);
    return null;
  }
}
