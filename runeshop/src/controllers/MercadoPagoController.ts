import { MercadoPagoService } from '../services/MercadoPagoService';


export const getMercadoPagoLinkController = async (usuarioDireccionId: number, detallesId:number[] ): Promise<any | null> => {
  try {
    const link = await MercadoPagoService.getLinkPago(usuarioDireccionId, detallesId);
    return link;
  } catch (error) {
    console.error("Error en getMercadoPagoLinkController:", error);
    return null;
  }
};

