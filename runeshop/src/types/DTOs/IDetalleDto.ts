import type { IDescuento } from "../IDescuento";

export interface IDetalleDto {
	color: string;
	estado: boolean;
	marca: string;
	stock: number;
	talles: number[];
    precio: number;
    descuento?: IDescuento;
    inicioDescuento?: Date;
    finDescuento?: Date;
}
