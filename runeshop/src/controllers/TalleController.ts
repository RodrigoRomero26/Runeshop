import { TalleService } from '../services/TalleService';

const talleService = new TalleService();

export const getTallesController = async (): Promise<any[]> => {
  try {
    const talles = await talleService.getAllTalles();
    return talles || [];
  } catch (error) {
    console.error("Error en getTallesController:", error);
    return [];
  }
};
