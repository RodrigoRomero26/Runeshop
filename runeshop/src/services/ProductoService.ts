
import axios from 'axios';
import { BackendClient } from './BackendClient';

export class ProductoService extends BackendClient {
  constructor() {
    super('producto');
  }

  async getAllProductos(): Promise<any> {
    const response = await axios.get(`${this.baseUrl}/`);
    return response.data;
  }

  async crearProducto(formData: FormData): Promise<any> {
    const response = await axios.post(`${this.baseUrl}/crear_producto`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }

  async filtroGeneral(params: any): Promise<any> {
    const response = await axios.get(`${this.baseUrl}/mujer/filtro`, { params });
    return response.data;
  }

  async filtroPrecio(min: number, max: number): Promise<any> {
    const response = await axios.get(`${this.baseUrl}/filtro_precio`, { params: { min, max } });
    return response.data;
  }

  async ordenarPrecioDesc(): Promise<any> {
    const response = await axios.get(`${this.baseUrl}/ord_desc`);
    return response.data;
  }
}
