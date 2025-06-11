import axios from "axios";
import type { ITalle } from "../types/ITalle";
import api from "../api/api";

export class TallesService {
	static async getAllTalles(): Promise<ITalle[] | null> {
        const response = await api.get("/talle");
        return response.data;
    }
    static async createTalle(numeroIn: number): Promise<ITalle | null> {
        const talle={
            numero: numeroIn
        }
        const response = await api.post("/talle", talle);
        return response.data;
    }
}
