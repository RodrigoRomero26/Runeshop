import { ProductoService } from "../services/ProductoService";
import type { IDetalleDto } from "../types/DTOs/IDetalleDto";
import type { IFiltrosDto } from "../types/DTOs/IFiltrosDto";
import type { IProductoDto } from "../types/DTOs/IProductoDto";
import type { IProducto } from "../types/IProducto";
import type { Page } from "../types/Pages";

export const getProductosController = async (
	filtros: IFiltrosDto = {},
	page: number = 0,
	size: number = 10,
	orden: string = "asc"
): Promise<Page<IProducto> | null> => {
	try {
		const productos = await ProductoService.getProductosPaginados(
			filtros,
			page,
			size,
			orden
		);
		return productos;
	} catch (error) {
		console.error("Error en getProductosController:", error);
		return null;
	}
};

export const crearProductoController = async (
	producto: IProductoDto,
	detalle: IDetalleDto,
	imagenes: File[]
): Promise<any | null> => {
	try {
		const data = await ProductoService.crearProducto(
			producto,
			detalle,
			imagenes
		);
		return data;
	} catch (error) {
		console.error("Error en crearProductoController:", error);
		return null;
	}
};

export const getAllProductosController = async (): Promise<IProducto[] | null> => {
	try {
		const productos = await ProductoService.getAllProductos();
		return productos;
	} catch (error) {
		console.error("Error en getAllProductosController:", error);
		return null;
	}
}
