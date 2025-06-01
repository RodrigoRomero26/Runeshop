import { DescuentoService } from '../services/DescuentoService';
import type { IDescuento } from '../types/IDescuento';



export const getDescuentosController = async (): Promise<IDescuento[]> => {
  try {
    const descuentos = await DescuentoService.getDescuentos();
    return descuentos || [];
  } catch (error) {
    console.error("Error en getDescuentosController:", error);
    return [];
  }
};


