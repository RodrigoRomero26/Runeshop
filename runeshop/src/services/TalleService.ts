
import axios from 'axios';
import { BackendClient } from './BackendClient';

export class TalleService extends BackendClient {
  constructor() {
    super('talle');
  }

  async getAllTalles(): Promise<any> {
    const response = await axios.get(`${this.baseUrl}/`);
    return response.data;
  }
}
