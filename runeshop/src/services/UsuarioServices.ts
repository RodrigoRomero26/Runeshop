import api from "../api/api";
import type { IUsuarioDto } from "../types/DTOs/IUsuarioDto";
import type { IUsuarioGet } from "../types/IUsuarioGet";

export class UsuarioServices {
	static async getUsuariosById(id: number): Promise<IUsuarioGet> {
		try {
			const res = await api.get(`/usuario/${id}`);
			return res.data;
		} catch (error) {
			console.error(error);
			throw new Error("Error al obtener el usuario");
		}
	}

	static async updateUsuario(usuario: IUsuarioDto): Promise<IUsuarioGet> {
		try {
			const res = await api.put(`/usuario`, usuario);
			return res.data;
		} catch (error) {
			console.error(error);
			throw new Error("Error al actualizar el usuario");
		}
	}
}
