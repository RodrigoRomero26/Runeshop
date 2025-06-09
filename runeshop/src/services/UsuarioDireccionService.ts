import api from "../api/api";
import type { IDireccionDto } from "../types/DTOs/IDireccionDto";
import type { IDireccion } from "../types/IDireccion";

export class UsuarioDireccionService {
	static async getDireccionesPorUsuario(
		usuarioId: number
	): Promise<IDireccion[] | null> {
		try {
			const res = await api.get<IDireccion[]>(
				`/usuarios/${usuarioId}/direcciones`
			);
			return res.data;
		} catch (error) {
			console.error("Error al obtener direcciones:", error);
			return null;
		}
	}

    static async agregarDireccion(usuarioId: number, direccion: IDireccionDto): Promise<string | null> {
	try {
		const res = await api.post<string>(`perfil/usuarios/${usuarioId}/direcciones`, direccion);
		return res.data;
	} catch (error) {
		console.error("Error al agregar dirección:", error);
		return null;
	}
}

	static async actualizarDireccion(
		direccion: IDireccionDto
	): Promise<string | null> {
		try {
			const res = await api.put<string>(`direccion`, direccion);
			return res.data;
		} catch (error) {
			console.error("Error al actualizar dirección:", error);
			return null;
		}
	}

	static async eliminarDireccion(direccionId: number): Promise<string | null> {
		try {
			const res = await api.put(`direccion/${direccionId}`);
			return res.data;
		} catch (error) {
			console.error("Error al eliminar dirección:", error);
			return null;
		}
	}

}
