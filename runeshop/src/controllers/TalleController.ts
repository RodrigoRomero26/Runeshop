
import { TallesService } from "../services/TallesServices";
import type { ITalle } from "../types/ITalle";

export const talleDisponibleController = async (talle: number): Promise<ITalle> => {
    try {
        const talles = await TallesService.getAllTalles();
        if (!talles) {
            throw new Error("No se pudieron obtener los talles");
        }
        const talleExistente = talles.find(
            (t) => t.numero === talle
        );
        if (talleExistente) {
            return talleExistente;
        }
        const nuevoTalle = await TallesService.createTalle(talle);
        if (!nuevoTalle) {
            throw new Error("No se pudo crear el nuevo talle");
        }
        return nuevoTalle;
    } catch (error) {
        console.error("Error en talleDisponibleController:", error);
        throw new Error("Error al verificar o crear el talle");
    }
}

export const getTallesController = async (): Promise<ITalle[]> => {
    try {
        const talles = await TallesService.getAllTalles();
        return talles || [];
    } catch (error) {
        console.error("Error en getTallesController:", error);
        return [];
    }
}