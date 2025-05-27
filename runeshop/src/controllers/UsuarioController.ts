import { UsuarioService } from "../services/UsuarioService";


const usuarioService = new UsuarioService();

export const getUsuariosController = async (): Promise<any[]> => {
  try {
    const usuarios = await usuarioService.getAllUsuarios();
    return usuarios || [];
  } catch (error) {
    console.error("Error en getUsuariosController:", error);
    return [];
  }
};
