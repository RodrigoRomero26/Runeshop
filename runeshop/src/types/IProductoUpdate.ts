import type { ICategoria } from "./ICategoria";

export interface IProductoUpdate {
    id?: number;
    modelo: string;
    sexo: string;
    tipoProducto: string;
    estado: boolean;
    categoria: ICategoria;

}