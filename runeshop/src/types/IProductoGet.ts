import type { ICategoria } from "./ICategoria";
import type { IDetalle } from "./IDetalle";

export interface IProductoGet {
    id?: number;
    modelo: string;
    sexo: string;
    tipoProducto: string;
    estado: boolean;
    categoria: ICategoria;
    detalles: IDetalle[];
}