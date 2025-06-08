import { TallesService } from "../services/TallesServices";
import type { ITalle } from "../types/ITalle";

export const getTallesController = async (): Promise<ITalle[]> => {
  try {
    const talles = await TallesService.getTalles();
    return talles || [];
  } catch (error) {
    console.error("Error en getTallesController:", error);
    return [];
  }
};
