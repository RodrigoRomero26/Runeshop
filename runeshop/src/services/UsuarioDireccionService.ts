import api from "../api/api";
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

    static async agregarDireccion(usuarioId: number, direccion: IDireccion): Promise<string | null> {
	try {
		const res = await api.post<string>(`/usuarios/${usuarioId}/direcciones`, direccion);
		return res.data;
	} catch (error) {
		console.error("Error al agregar dirección:", error);
		return null;
	}
}

}
