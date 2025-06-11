import { ProductoService } from "../services/ProductoService";
import type { IDetalleCreate } from "../types/DTOs/IDetalleCreate";
import type { IDetalleDto } from "../types/DTOs/IDetalleDto";
import type { IFiltrosDto } from "../types/DTOs/IFiltrosDto";
import type { IProductoDto } from "../types/DTOs/IProductoDto";
import type { IProducto } from "../types/IProducto";
import type { IProductoGet } from "../types/IProductoGet";
import type { IProductoUpdate } from "../types/IProductoUpdate";
import type { Page } from "../types/Pages";

export const getProductosController = async (
	filtros: IFiltrosDto = {},
	page: number = 0,
	size: number = 10,
	orden: string = "asc"
): Promise<Page<IProductoGet> | null> => {
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
	detalle: IDetalleCreate,
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

export const getAllProductosController = async (): Promise<
	IProductoGet[] | null
> => {
	try {
		const productos = await ProductoService.getAllProductos();
		return productos;
	} catch (error) {
		console.error("Error en getAllProductosController:", error);
		return null;
	}
};

export const getProductoByIdController = async (
	id: number
): Promise<IProductoGet | null> => {
	try {
		const producto = await ProductoService.getProductoById(id);
		return producto;
	} catch (error) {
		console.error("Error en getProductoByIdController:", error);
		return null;
	}
};

export const updateProductoController = async ( producto: IProductoUpdate): Promise<IProductoUpdate | null> => {
	try {
		const updatedProducto = await ProductoService.updateProducto(producto);
		return updatedProducto;
	} catch (error) {
		console.error("Error en updateProductoController:", error);
		return null;
	}
}
