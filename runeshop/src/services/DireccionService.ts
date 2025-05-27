
import axios from 'axios';
import { BackendClient } from './BackendClient';

export class DireccionService extends BackendClient {
  constructor() {
    super('direccion');
  }

  async getAllDirecciones(): Promise<any> {
    const response = await axios.get(`${this.baseUrl}/`);
    return response.data;
  }
}

