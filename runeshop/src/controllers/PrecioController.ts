import { PrecioService } from "../services/PrecioService";
import type { IPrecio } from "../types/IPrecio";

export const  precioDisponibleController = async (precioVenta: number, precioCompra:number):Promise<IPrecio> => {
    try{
        const precios = await PrecioService.getAllPrecios();
        if (!precios) {
            throw new Error("No se pudieron obtener los precios");
        }
        const precioExistente = precios.find(
            (p) => p.precioVenta === precioVenta && p.precioCompra === precioCompra
        );
        if (precioExistente) {
            return precioExistente;
        }
        const precio={
            precioVenta,
            precioCompra
        }
        const nuevoPrecio = await PrecioService.createPrecio(precio);
        if (!nuevoPrecio) {
            throw new Error("No se pudo crear el nuevo precio");
        }
        return nuevoPrecio;
    }catch (error) {
        console.error("Error en precioDisponibleController:", error);
        throw new Error("Error al verificar o crear el precio");
    }
}