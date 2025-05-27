import { OrdenCompraService } from '../services/OrdenCompraService';

const ordenCompraService = new OrdenCompraService();

export const getOrdenesController = async (): Promise<any[]> => {
  try {
    const ordenes = await ordenCompraService.getAllOrdenes();
    return ordenes || [];
  } catch (error) {
    console.error("Error en getOrdenesController:", error);
    return [];
  }
};

export const crearOrdenCompraController = async (usuarioDireccionId: number, detallesId: string, body: any): Promise<any | null> => {
  try {
    const orden = await ordenCompraService.crearOrdenCompra(usuarioDireccionId, detallesId, body);
    return orden;
  } catch (error) {
    console.error("Error en crearOrdenCompraController:", error);
    return null;
  }
};
