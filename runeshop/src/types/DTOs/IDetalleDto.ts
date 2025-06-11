import type { IDescuento } from "../IDescuento";
import type { IDetalle } from "../IDetalle";

export interface IDetalleDto {
	color: string;
	estado: boolean;
	marca: string;
	stock: number;
	talles: IDetalle;
    precio: number;
    descuento?: IDescuento;
    inicioDescuento?: Date;
    finDescuento?: Date;
}
