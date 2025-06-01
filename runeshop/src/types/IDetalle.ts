import type { IDescuento } from './IDescuento';

export interface IDetalle {
    id?: number;
    color: string;
    estado: string;
    marca: string;
    stock: number;
    descuentos: IDescuento;
    precio_descuento: number;
    inicio_descuento: Date;
    fin_descuento: Date;
}