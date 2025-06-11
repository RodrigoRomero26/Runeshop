import api from "../api/api";

export class ImagenService {
    static async subirImagenes(
        imagen: File
    ): Promise<string | null> {
        try {
            
            const res = await api.post("/imagen/subir", imagen, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            return res.data
        } catch (error) {
            console.error("Error al subir imágenes:", error);
            return null;
        }
    }
}