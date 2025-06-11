
import { number } from 'yup';
import api from '../api/api';
import type { IDetalleUpdate } from '../types/DTOs/IDetalleUpdate';
import type { IDetalle } from '../types/IDetalle';
import type { IDetalleCreate } from '../types/DTOs/IDetalleCreate';

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

  static async updateDetalle(detalle: IDetalleUpdate): Promise<IDetalle | null> {
    try {
      const res = await api.put('/detalle', detalle);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

// En DetalleService
static async agregarDetalle(detalle: IDetalleCreate, prodId: number, imagen: File[]): Promise<IDetalle | null> {
  try {
    const formData = new FormData();

    formData.append(
				"detalle",
				new Blob([JSON.stringify(detalle)], { type: "application/json" })
			);

      formData.append(
				"prodId",
				new Blob([JSON.stringify(prodId)], { type: "application/json" })
			);

      imagen.forEach((img) => {
				const correctedImage = img.type
					? img
					: new File([img], img.name, { type: "image/jpeg" }); // cambiar a image/png si fuera necesario

				formData.append("imagen", correctedImage);
			});

    const res = await api.post("/detalle/agregar", formData, {
				headers: {
					"Content-Type": "multipart/form-data", // opcional, axios lo maneja bien solo
				},
			});
    return res.data;
  } catch (error) {
    console.error('Error al agregar detalle:', error);
    return null;
  }
}


}
