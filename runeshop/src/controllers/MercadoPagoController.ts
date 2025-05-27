import { MercadoPagoService } from '../services/MercadoPagoService';

const mercadoPagoService = new MercadoPagoService();

export const getMercadoPagoLinkController = async (usuarioDireccionId: number, detallesId: string): Promise<any | null> => {
  try {
    const link = await mercadoPagoService.getMercadoPagoLink(usuarioDireccionId, detallesId);
    return link;
  } catch (error) {
    console.error("Error en getMercadoPagoLinkController:", error);
    return null;
  }
};

