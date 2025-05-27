import { ProductoService } from '../services/ProductoService';

const productoService = new ProductoService();

export const getProductosController = async (): Promise<any[]> => {
  try {
    const productos = await productoService.getAllProductos();
    return productos || [];
  } catch (error) {
    console.error("Error en getProductosController:", error);
    return [];
  }
};

export const crearProductoController = async (formData: FormData): Promise<any | null> => {
  try {
    const producto = await productoService.crearProducto(formData);
    return producto;
  } catch (error) {
    console.error("Error en crearProductoController:", error);
    return null;
  }
};

export const filtroGeneralController = async (params: any): Promise<any[]> => {
  try {
    const productos = await productoService.filtroGeneral(params);
    return productos || [];
  } catch (error) {
    console.error("Error en filtroGeneralController:", error);
    return [];
  }
};

export const filtroPrecioController = async (min: number, max: number): Promise<any[]> => {
  try {
    const productos = await productoService.filtroPrecio(min, max);
    return productos || [];
  } catch (error) {
    console.error("Error en filtroPrecioController:", error);
    return [];
  }
};

export const ordenarPrecioDescController = async (): Promise<any[]> => {
  try {
    const productos = await productoService.ordenarPrecioDesc();
    return productos || [];
  } catch (error) {
    console.error("Error en ordenarPrecioDescController:", error);
    return [];
  }
};
