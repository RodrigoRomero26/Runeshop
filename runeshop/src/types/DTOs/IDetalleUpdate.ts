import type { IDescuento } from "../IDescuento";
import type { IImagen } from "../IImagen";
import type { IImagenGet } from "../IImagenGet";
import type { IOrdenCompra } from "../IOrdenCompra";
import type { IPrecio } from "../IPrecio";
import type { IProducto } from "../IProducto";
import type { ITalle } from "../ITalle";

export interface IDetalleUpdate {
    id?: number;
    color: string;
    estado: string;
    marca: string;
    stock: number;
    descuentos: IDescuento | null;
    precio_descuento: number | null;
    inicioDescuento: Date | null;
    finDescuento: Date | null;
    talle: ITalle;
    precio: IPrecio;
    imagenes: IImagenGet[];
    producto: IProducto
    ordenCompras?: IOrdenCompra[];
}