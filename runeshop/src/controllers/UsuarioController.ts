import { UsuarioServices } from "../services/UsuarioServices";
import type { IUsuarioDto } from "../types/DTOs/IUsuarioDto";
import type { IUsuarioGet } from "../types/IUsuarioGet";

export const getUsuario = async (usuarioId: number): Promise<{usuario: IUsuarioGet | null, error:string|null} > => {
    try {
        const usuario = await UsuarioServices.getUsuariosById(usuarioId);
        return {usuario, error: null};
    } catch (error: any) {
        console.error("Error en getUsuarioController:", error.message);
        return {usuario: null, error: error.message};
    }
}

export const updateUsuario = async (updatedUser: IUsuarioDto) =>{
    try {
        const updatedUsuario = await UsuarioServices.updateUsuario(updatedUser);
        return {updatedUsuario, error: null};
    } catch (error: any) {
        console.error("Error en updateUsuarioController:", error.message);
        return {updatedUsuario: null, error: error.message};
    }
}