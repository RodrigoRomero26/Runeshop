import api from "../api/api";
import type { IDetalleCreate } from "../types/DTOs/IDetalleCreate";
import type { IDetalleDto } from "../types/DTOs/IDetalleDto";
import type { IFiltrosDto } from "../types/DTOs/IFiltrosDto";
import type { IProductoDto } from "../types/DTOs/IProductoDto";
import type { IProductoGet } from "../types/IProductoGet";
import type { IProductoUpdate } from "../types/IProductoUpdate";
import type { Page } from "../types/Pages";

export class ProductoService {
	static async crearProducto(
		producto: IProductoDto,
		detalle: IDetalleCreate,
		imagenes: File[]
	): Promise<any | null> {
		try {
			const formData = new FormData();

			formData.append(
				"producto",
				new Blob([JSON.stringify(producto)], { type: "application/json" })
			);

			formData.append(
				"detalle",
				new Blob([JSON.stringify(detalle)], { type: "application/json" })
			);

			imagenes.forEach((img) => {
				const correctedImage = img.type
					? img
					: new File([img], img.name, { type: "image/jpeg" }); // cambiar a image/png si fuera necesario

				formData.append("imagen", correctedImage);
			});

			const res = await api.post("/producto/crear_producto", formData, {
				headers: {
					"Content-Type": "multipart/form-data", // opcional, axios lo maneja bien solo
				},
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
		orden: string = filtros.orden || "asc"
	): Promise<Page<IProductoGet> | null> {
		try {
			const params = new URLSearchParams();

			if (filtros.sexo) filtros.sexo.forEach((v) => params.append("sexo", v));
			if (filtros.marca)
				filtros.marca.forEach((v) => params.append("marca", v));
			if (filtros.talle)
				filtros.talle.forEach((v) =>
					params.append("talleNumero", v.toString())
				);
			if (filtros.tipoProducto)
				filtros.tipoProducto.forEach((v) => params.append("tipoProducto", v));
			if (filtros.categoria)
				filtros.categoria.forEach((v) => params.append("categoria", v));
			if (filtros.modelo) params.append("modelo", filtros.modelo);

			if (filtros.min !== null && filtros.min !== undefined) {
				params.append("min", filtros.min.toString());
			}

			if (filtros.max !== null && filtros.max !== undefined) {
				params.append("max", filtros.max.toString());
			}

			console.log("params:", params.toString());

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

	static async getProductoById(id: number): Promise<IProductoGet | null> {
		try {
			const res = await api.get<IProductoGet>(`/producto/${id}`);
			return res.data;
		} catch (error) {
			console.error("Error al obtener producto por ID:", error);
			return null;
		}
	}

	static async updateProducto(
		producto: IProductoUpdate
	): Promise<IProductoUpdate | null> {
		try {
			const res = await api.put<IProductoGet>(`/producto`, producto);
			return res.data;
		} catch (error) {
			console.error("Error al actualizar producto:", error);
			return null;
		}
	}
}
