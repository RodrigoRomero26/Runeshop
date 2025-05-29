// src/services/ProductoService.ts
import api from '../api/api';

export class ProductoService {
  static async crearProducto(
    producto: string,
    detalle: string,
    imagenes: File[]
  ): Promise<any | null> {
    try {
      const formData = new FormData();
      formData.append('producto', producto);
      formData.append('detalle', detalle);
      imagenes.forEach((img) => formData.append('imagen', img));

      const res = await api.post('/producto/crear_producto', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async getProductos(): Promise<any[]> {
    try {
      const res = await api.get('/producto');
      return res.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  static async filtroGeneral(params: any): Promise<any[]> {
    try {
      const res = await api.get('/producto/filtro', { params });
      return res.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  static async filtroPrecio(min: number, max: number): Promise<any[]> {
    try {
      const res = await api.get('/producto/filtro_precio', { params: { min, max } });
      return res.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  static async ordenarDescendente(): Promise<any[]> {
    try {
      const res = await api.get('/producto/ord_desc');
      return res.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
