// src/services/ProductoService.ts
import api from "../api/api";
import type { IDetalleDto } from "../types/DTOs/IDetalleDto";
import type { IFiltrosDto } from "../types/DTOs/IFiltrosDto";
import type { IProductoDto } from "../types/DTOs/IProductoDto";
import type { IProducto } from "../types/IProducto";
import type { IProductoGet } from "../types/IProductoGet";
import type { Page } from "../types/Pages";

export class ProductoService {
	static async crearProducto(
		producto: IProductoDto,
		detalle: IDetalleDto,
		imagenes: File[]
	): Promise<any | null> {
		try {
			const formData = new FormData();
			formData.append("producto", JSON.stringify(producto));
			formData.append("detalle", JSON.stringify(detalle));
			imagenes.forEach((img) => formData.append("imagen", img));

			const res = await api.post("/producto/crear_producto", formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});
			return res.data;
		} catch (error) {
			console.error("Error al crear producto:", error);
			return null;
		}
	}

	static async getProductosPaginados(
	filtros: IFiltrosDto = {},
	page: number = 0,
	size: number = 10,
	orden: string = "asc"
): Promise<Page<IProductoGet> | null> {
	try {
		const params = new URLSearchParams();

		if (filtros.sexo) filtros.sexo.forEach((v) => params.append("sexo", v));
		if (filtros.marca) filtros.marca.forEach((v) => params.append("marca", v));
		if (filtros.talle) filtros.talle.forEach((v) => params.append("talle", v.toString()));
		if (filtros.tipoProducto) filtros.tipoProducto.forEach((v) => params.append("tipoProducto", v));
		if (filtros.modelo) filtros.modelo.forEach((v) => params.append("modelo", v));
		if (filtros.categoria) filtros.categoria.forEach((v) => params.append("categoria", v));

		if (filtros.min !== null && filtros.min !== undefined) {
			params.append("min", filtros.min.toString());
		}

		if (filtros.max !== null && filtros.max !== undefined) {
			params.append("max", filtros.max.toString());
		}

		console.log(params.toString());

		params.append("orden", orden);
		params.append("page", page.toString());
		params.append("size", size.toString());

		const res = await api.get<Page<IProductoGet>>("/producto/filtro", {
			params,
		});

		return res.data;
	} catch (error) {
		console.error("Error al obtener productos filtrados:", error);
		return null;
	}
}

	static async getAllProductos(): Promise<IProductoGet[] | null> {
		try {
			const res = await api.get<IProductoGet[]>("/producto");
			return res.data;
		} catch (error) {
			console.error("Error al obtener todos los productos:", error);
			return null;
		}
	}
}
