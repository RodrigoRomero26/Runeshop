export interface IFiltrosDto {
    sexo?: string[];
    marca?: string[];
    nombre?: string;
    talle?: number[];
    tipoProducto?:string[];
    modelo?: string[];
    categoria?: string[];
    min?: number | null;
    max?: number | null;
    orden?: string;
}