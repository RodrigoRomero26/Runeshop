import type { IDescuento } from './IDescuento';
import type { IImagen } from './IImagen';
import type { IImagenGet } from './IImagenGet';
import type { IOrdenCompra } from './IOrdenCompra';
import type { IPrecio } from './IPrecio';
import type { ITalle } from './ITalle';

export interface IDetalle {
    id?: number;
    color: string;
    estado: string;
    marca: string;
    stock: number;
    descuentos: IDescuento | null;
    precio_descuento: number | null;
    inicio_descuento: Date | null;
    fin_descuento: Date | null;
    talle: ITalle;
    precio: IPrecio;
    imagenes: IImagenGet[];
    ordenCompras: IOrdenCompra[];
}