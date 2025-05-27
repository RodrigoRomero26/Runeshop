
import axios from 'axios';
import { BackendClient } from './BackendClient';

export class ImagenService extends BackendClient {
  constructor() {
    super('detalle');
  }

  async actualizarImagenDetalle(formData: FormData): Promise<any> {
    const response = await axios.put(`${this.baseUrl}/actualizarImagenDetalle`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }
}
