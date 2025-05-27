import { PrecioService } from '../services/PrecioService';

const precioService = new PrecioService();

export const getPreciosController = async (): Promise<any[]> => {
  try {
    const precios = await precioService.getAllPrecios();
    return precios || [];
  } catch (error) {
    console.error("Error en getPreciosController:", error);
    return [];
  }
};

export const crearPrecioController = async (data: any): Promise<any | null> => {
  try {
    const precio = await precioService.crearPrecio(data);
    return precio;
  } catch (error) {
    console.error("Error en crearPrecioController:", error);
    return null;
  }
};
