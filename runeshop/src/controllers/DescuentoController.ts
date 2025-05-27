import { DescuentoService, DetalleDescuentoService } from '../services/DescuentoService';

const descuentoService = new DescuentoService();
const detalleDescuentoService = new DetalleDescuentoService();

export const getDescuentosController = async (): Promise<any[]> => {
  try {
    const descuentos = await descuentoService.getAllDescuentos();
    return descuentos || [];
  } catch (error) {
    console.error("Error en getDescuentosController:", error);
    return [];
  }
};

export const agregarDescuentoController = async (detalleId: number, descuentoId: number, finDescuento: string): Promise<any | null> => {
  try {
    const resultado = await detalleDescuentoService.agregarDescuento(detalleId, descuentoId, finDescuento);
    return resultado;
  } catch (error) {
    console.error("Error en agregarDescuentoController:", error);
    return null;
  }
};

