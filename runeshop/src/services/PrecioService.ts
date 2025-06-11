import api from "../api/api";
import type { IPrecio } from "../types/IPrecio";

export class PrecioService {
    static async getAllPrecios(): Promise<IPrecio[] | null> {
        const response = await api.get("/precio");
		return response.data;
    }
    static async createPrecio(precio: IPrecio): Promise<IPrecio | null> {
        const response = await api.post("/precio", precio);
        return response.data;
    }
}