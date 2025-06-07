import { UbicacionService } from "../services/UbicacionesService";


export const fetchProvincias = async (): Promise<string[]> => {
  try {
    return await UbicacionService.getProvincias();
  } catch (error) {
    console.error("Error al obtener provincias:", error);
    return [];
  }
};

export const fetchDepartamentos = async (
  provincia: string
): Promise<string[]> => {
  try {
    return await UbicacionService.getDepartamentos(provincia);
  } catch (error) {
    console.error("Error al obtener departamentos:", error);
    return [];
  }
};
