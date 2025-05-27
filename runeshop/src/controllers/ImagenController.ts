import { ImagenService } from '../services/ImagenService';

const imagenService = new ImagenService();

export const actualizarImagenDetalleController = async (formData: FormData): Promise<any | null> => {
  try {
    const imagen = await imagenService.actualizarImagenDetalle(formData);
    return imagen;
  } catch (error) {
    console.error("Error en actualizarImagenDetalleController:", error);
    return null;
  }
};
