import type { IProducto } from './IProducto';

export interface ICategoria {
    id?: number;
    nombre: string;
    productos:IProducto[];
}