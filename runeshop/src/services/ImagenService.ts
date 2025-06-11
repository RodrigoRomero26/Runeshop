import api from "../api/api";
import type { IImagen } from "../types/IImagen";
import type { IImagenGet } from "../types/IImagenGet";

export class ImagenService {
    static async subirImagenes(
        imagen: File[]
    ): Promise<IImagenGet[] | null> {
        try {
            const formData = new FormData();
            imagen.forEach((img) => {
                formData.append("imagen", img); 
            });

            const res = await api.post("/imagen/subirImagen", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            return res.data;
        } catch (error) {
            console.error("Error al subir imágenes:", error);
            return null;
        }
    }
}
