export interface IFiltrosDto {
    sexo?: string[];
    marca?: string[];
    modelo?: string;
    talle?: number[];
    tipoProducto?:string[];
    categoria?: string[];
    min?: number | null;
    max?: number | null;
    orden?: string;
}