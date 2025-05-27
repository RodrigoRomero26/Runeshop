import { PerfilService } from "../services/PerfilService";


const perfilService = new PerfilService();

export const getPerfilController = async (): Promise<any | null> => {
  try {
    const perfil = await perfilService.getUsuarioPerfil();
    return perfil;
  } catch (error) {
    console.error("Error en getPerfilController:", error);
    return null;
  }
};

export const getDireccionesPorUsuarioController = async (usuarioId: number): Promise<any[]> => {
  try {
    const direcciones = await perfilService.getDireccionesPorUsuario(usuarioId);
    return direcciones || [];
  } catch (error) {
    console.error("Error en getDireccionesPorUsuarioController:", error);
    return [];
  }
};
