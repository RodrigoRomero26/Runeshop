import { ImagenService } from "../services/ImagenService";
import type { IImagen } from "../types/IImagen";
import type { IImagenGet } from "../types/IImagenGet";

export const createImagenController = async (imagenes: File[]): Promise<IImagenGet[] | null> => {
    try {
        const imagenesSubidas = await ImagenService.subirImagenes(imagenes);
        if (!imagenesSubidas) {
            throw new Error("No se pudieron subir las imágenes");
        }
        return imagenesSubidas;
    } catch (error) {
        console.error("Error en createImagenController:", error);
        throw new Error("Error al crear las imágenes");
    }
}