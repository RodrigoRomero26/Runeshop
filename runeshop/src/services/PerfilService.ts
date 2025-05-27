import axios from "axios";
import { BackendClient } from "./BackendClient";

export class PerfilService extends BackendClient {
  constructor() {
    super('perfil');
  }

  async getUsuarioPerfil(): Promise<any> {
    const response = await axios.get(`${this.baseUrl}/`);
    return response.data;
  }

  async getDireccionesPorUsuario(usuarioId: number): Promise<any> {
    const response = await axios.get(`${this.baseUrl}/usuarios/${usuarioId}/direcciones`);
    return response.data;
  }
}
