import { UsuarioDireccionService } from "../services/UsuarioDireccionService";
import type { IDireccion } from "../types/IDireccion";

export const getDireccionesPorUsuarioController = async (usuarioId: number): Promise<IDireccion[] | null> => {
	try {
		const direcciones = await UsuarioDireccionService.getDireccionesPorUsuario(usuarioId);
		return direcciones;
	} catch (error) {
		console.error("Error en getDireccionesPorUsuarioController:", error);
		return null;
	}
};

export const agregarDireccionController = async (usuarioId: number, direccion: IDireccion): Promise<string | null> => {
	try {
		const res = await UsuarioDireccionService.agregarDireccion(usuarioId, direccion);
		return res;
	} catch (error) {
		console.error("Error en agregarDireccionController:", error);
		return null;
	}
};
