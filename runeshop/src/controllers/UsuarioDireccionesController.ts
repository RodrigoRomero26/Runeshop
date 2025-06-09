import { UsuarioDireccionService } from "../services/UsuarioDireccionService";
import type { IDireccionDto } from "../types/DTOs/IDireccionDto";
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

export const agregarDireccionController = async (usuarioId: number, direccion: IDireccionDto): Promise<string | null> => {
	try {
		const res = await UsuarioDireccionService.agregarDireccion(usuarioId, direccion);
		return res;
	} catch (error) {
		console.error("Error en agregarDireccionController:", error);
		return null;
	}
};

export const actualizarDireccionController = async (direccion: IDireccionDto): Promise<string | null> => {
	try {
		const res = await UsuarioDireccionService.actualizarDireccion(direccion);
		return res;
	} catch (error) {
		console.error("Error en actualizarDireccionController:", error);
		return null;
	}
}

export const eliminarDireccionController = async (direccionId: number): Promise<string | null> => {
	try {
		const res = await UsuarioDireccionService.eliminarDireccion(direccionId);
		return res;
	} catch (error) {
		console.error("Error en eliminarDireccionController:", error);
		return null;
	}
};
