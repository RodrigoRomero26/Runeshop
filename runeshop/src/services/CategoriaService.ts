
import axios from 'axios';
import { BackendClient } from './BackendClient';

export class CategoriaService extends BackendClient {
  constructor() {
    super('categoria');
  }

  async getAllCategorias(): Promise<any> {
    const response = await axios.get(`${this.baseUrl}/`);
    return response.data;
  }

  async createCategoria(data: { nombre: string }): Promise<any> {
    const response = await axios.post(`${this.baseUrl}/`, data);
    return response.data;
  }
}
