// src/services/DetalleService.ts
import api from '../api/api';

export class DetalleService {
  static async actualizarImagenDetalle(detalleId: number, imagenId: number, imagen: File): Promise<any | null> {
    try {
      const formData = new FormData();
      formData.append('detalleId', String(detalleId));
      formData.append('imagenId', String(imagenId));
      formData.append('imagen', imagen);

      const res = await api.put('/detalle/actualizarImagenDetalle', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async agregarDescuento(detalleId: number, descuentoId: number, finDescuento: string): Promise<any | null> {
    try {
      const res = await api.put(
        `/detalle/agregarDescuento?detalleId=${detalleId}&descuentoId=${descuentoId}&finDescuento=${finDescuento}`
      );
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async getDetalles(): Promise<any[]> {
    try {
      const res = await api.get('/detalle');
      return res.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
