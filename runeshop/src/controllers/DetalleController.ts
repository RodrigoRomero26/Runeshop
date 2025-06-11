import { DetalleService } from "../services/DetalleService";
import type { IDetalleCreate } from "../types/DTOs/IDetalleCreate";
import type { IDetalleUpdate } from "../types/DTOs/IDetalleUpdate";
import type { IDetalle } from "../types/IDetalle";

export const getDetallesController = async (): Promise<IDetalle[]> => {
	try {
		const detalles = await DetalleService.getDetalles();
		return detalles || [];
	} catch (error) {
		console.error("Error en getDetallesController:", error);
		return [];
	}
};

export const updateDetalleController = async (
	detalle: IDetalleUpdate
): Promise<IDetalle | null> => {
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
	prodId: number,
	imagenes: File[]
): Promise<any | null> => {
	try {
		const data = await DetalleService.agregarDetalle(detalle, prodId, imagenes);
		return data;
	} catch (error) {
		console.error("Error al agregar detalle:", error);
		return null;
	}
};
