export interface IDetalleCreate {
    color: string;
    estado: boolean;
    marca: string;
    stock: number;
    talles: {id: number}
    precio: {id: number};
}