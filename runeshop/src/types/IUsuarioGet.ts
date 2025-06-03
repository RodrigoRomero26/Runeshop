import type { IAuthorities } from "./IAuthorities";
import type { IUsuariosDirecciones } from "./IUsuariosDirecciones";

export interface IUsuarioGet {
    id:number;
    nombre: string;
    nombreUsuario: string;
    apellido: string;
    contraseña: string;
    email: string;
    tipoUsuario: string;
    dni:number;
    estado:boolean;
    usuariosDirecciones: IUsuariosDirecciones[];
    authorities: IAuthorities
}