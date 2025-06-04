import { AuthService } from '../services/AuthService';
import type { ILoginResponse } from '../types/ILoginResponse';

export const loginController = async (data: { nombreUsuario: string; contrasenia: string }): Promise<ILoginResponse | null> => {
  try {
    const user = await AuthService.login(data);
    return user;
  } catch (error) {
    console.error("Error en loginController:", error);
    return null;
  }
};

export const registerController = async (data: any): Promise<{ user: any | null, error: string | null }> => {
  try {
    const user = await AuthService.register(data);
    return { user, error: null };
  } catch (error: any) {
    console.error("Error en registerController:", error.message);
    return { user: null, error: error.message };
  }
};
;
