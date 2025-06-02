import { AuthService } from '../services/AuthService';

export const loginController = async (data: { nombreUsuario: string; contrasenia: string }): Promise<any | null> => {
  try {
    const user = await AuthService.login(data);
    return user;
  } catch (error) {
    console.error("Error en loginController:", error);
    return null;
  }
};

export const registerController = async (data: any): Promise<any | null> => {
  try {
    const user = await AuthService.register(data);
    return user;
  } catch (error) {
    console.error("Error en registerController:", error);
    return null;
  }
};
