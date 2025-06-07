import axios from "axios";
import type { ITalle } from "../types/ITalle";
import api from "../api/api";

export class TallesService {
	static async getTalles(): Promise<ITalle[]> {
		const response = await api.get("/talle");
		return response.data;
	}
}
