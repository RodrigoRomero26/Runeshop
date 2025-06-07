import axios from "axios";

const baseUrl = "https://apis.datos.gob.ar/georef/api";

export class UbicacionService {
  static async getProvincias(): Promise<string[]> {
    const response = await axios.get(`${baseUrl}/provincias`);
    return response.data.provincias.map((p: any) => p.nombre);
  }

  static async getDepartamentos(provincia: string): Promise<string[]> {
    const response = await axios.get(`${baseUrl}/departamentos`, {
      params: {
        provincia,
        campos: "nombre",
        max: 1000,
      },
    });
    return response.data.departamentos.map((d: any) => d.nombre);
  }
}
