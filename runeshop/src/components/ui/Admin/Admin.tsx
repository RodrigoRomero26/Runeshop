import { useEffect, useState } from "react";
import styles from "./Admin.module.css";
import { AdminModal } from "../AdminModal/AdminModal";
import { AddStockModal } from "../AddStockModal/AddStockModal";
import { getProductosController } from "../../../controllers/ProductoController";
import { filtersStore } from "../../../store/filtersStore";
import type { IProductoGet } from "../../../types/IProductoGet";
import { EditProductAdmin } from "../EditProductAdmin/EditProductAdmin";
import { updateDetalleController } from "../../../controllers/DetalleController";
import type { IDetalleUpdate } from "../../../types/DTOs/IDetalleUpdate";

export const Admin = () => {
    const [openDetailsId, setOpenDetailsId] = useState<number | null>(null);
    const [openAddStockId, setOpenAddStockId] = useState<number | null>(null);
    const [openEditProductId, setOpenEditProductId] = useState<number | null>(null);
    const [productos, setProductos] = useState<IProductoGet[]>([]);
    const [openEditorProducts, setOpenEditorProducts] = useState(false);
    const filtros = filtersStore();

     const handleCloseEditorProducts = () => {
        setOpenEditorProducts(false);
    };

    useEffect(() => {
        const fetchProductos = async () => {
            const data = await getProductosController({
                sexo: filtros.genero,
                tipoProducto: filtros.tipoIndumentaria,
                categoria: filtros.categorias,
                marca: filtros.marcas,
                talle: filtros.talles,
                min: filtros.precioMin === "" ? null : filtros.precioMin,
                max: filtros.precioMax === "" ? null : filtros.precioMax,
                modelo: filtros.modelo || undefined,
            });
            setProductos(data?.content || []);
        };
        fetchProductos();
    }, [
        filtros.genero,
        filtros.tipoIndumentaria,
        filtros.categorias,
        filtros.marcas,
        filtros.talles,
        filtros.precioMin,
        filtros.precioMax,
        filtros.modelo,
    ]);

    const fetchProd = async () => {
        const data = await getProductosController({
            sexo: filtros.genero,
            tipoProducto: filtros.tipoIndumentaria,
            categoria: filtros.categorias,
            marca: filtros.marcas,
            talle: filtros.talles,
            min: filtros.precioMin === "" ? null : filtros.precioMin,
            max: filtros.precioMax === "" ? null : filtros.precioMax,
            modelo: filtros.modelo || undefined,
        });
        setProductos(data?.content || []);
    };

    const detalleSeleccionado = productos
        .flatMap((p) => p.detalles)
        .find((d) => d.id === openDetailsId);

    const detalleAddStock = productos
        .flatMap((p) => p.detalles)
        .find((d) => d.id === openAddStockId);

    const productoSeleccionado = productos.find((p) => p.id === openEditProductId);

    const productoDelDetalle = productos.find((p) =>
      p.detalles.some((d) => d.id === openDetailsId)
    );

    const productoDelDetalleAddStock = productos.find((p) =>
      p.detalles.some((d) => d.id === openAddStockId)
    );

    const productButtons = (productoId: number) => (
        <div className={styles.adminButtons}>
            <button
                onClick={() => {
                    setOpenEditProductId(productoId);
                    setOpenEditorProducts(true);
                }}
                className={styles.buttonAdmin}
                title="Editar producto"
            >
                <span className="material-symbols-outlined">edit</span>
            </button>

        </div>
    );

    // Handler para eliminar (desactivar) un detalle
    const handleEliminarDetalle = async (detalle: IDetalleUpdate, producto: IProductoGet) => {
        if (!window.confirm("¿Seguro que deseas eliminar este detalle?")) return;
        try {
            const { detalles, ...productoSinDetalles } = producto;
            const apiData = {
                id: detalle.id,
                color: detalle.color,
                estado: String(detalle.estado),
                marca: detalle.marca,
                producto: productoSinDetalles,
                descuentos: detalle.descuentos,
                precio_descuento: detalle.precio_descuento,
                inicioDescuento: detalle.inicioDescuento,
                finDescuento: detalle.finDescuento,
                stock: detalle.stock,
                talle: detalle.talle,
                precio: detalle.precio,
                imagenes: detalle.imagenes,
            };
            await updateDetalleController(apiData);
            await fetchProd();
        } catch (err) {
            alert("Error al eliminar el detalle");
        }
    };

    const handleToggleEstadoDetalle = async (detalle: IDetalleUpdate, producto: IProductoGet) => {
        if (!window.confirm(`¿Seguro que deseas ${detalle.estado ? "desactivar" : "activar"} este detalle?`)) return;
        try {
            const { detalles, ...productoSinDetalles } = producto;
            const apiData = {
                ...detalle,
                estado: (!detalle.estado).toString(),
                producto: productoSinDetalles,
            };
            await updateDetalleController(apiData);
            await fetchProd();
        } catch (err) {
            alert("Error al cambiar el estado del detalle");
        }
    };

    const detailButtons = (detalleId: number) => {
        const detalle = productos.flatMap((p) => p.detalles).find((d) => d.id === detalleId);
        const producto = productos.find((p) => p.detalles.some((d) => d.id === detalleId));
        if (!detalle || !producto) return null;

        return (
            <div className={styles.adminButtons}>
                <button
                    onClick={() => setOpenDetailsId(detalleId)}
                    className={styles.buttonAdmin}
                    title="Ver detalle"
                >
                    <span className="material-symbols-outlined">visibility</span>
                </button>
                <button
                    onClick={() => setOpenAddStockId(detalleId)}
                    className={styles.buttonAdmin}
                    title="Agregar stock"
                >
                    <span className="material-symbols-outlined">add</span>
                </button>
                {detalle.estado ? (
                    <button
                        className={styles.buttonAdmin}
                        title="Desactivar detalle"
                        onClick={() => handleToggleEstadoDetalle(detalle, producto)}
                    >
                        <span className="material-symbols-outlined">delete</span>
                    </button>
                ) : (
                    <button
                        className={styles.buttonAdmin}
                        title="Activar detalle"
                        onClick={() => handleToggleEstadoDetalle(detalle, producto)}
                    >
                        <span className="material-symbols-outlined">check</span>
                    </button>
                )}
                
            </div>
        );
    };

    return (
        <div className={styles.principalContainerAdmin}>
            <div className={styles.adminLayout}>
                <div className={styles.containerAdmin}>
                    {productos.length === 0 ? (
                        <p className={styles.noProductsMsg}>No hay productos para mostrar.</p>
                    ) : (
                        <ul className={styles.productList}>
                            {productos.map((producto) => (
                                <li key={producto.id} className={styles.productItem}>
                                    <div className={styles.productHeader}>
                                      <span className={styles.productModel} title={producto.modelo}>
                                        {producto.modelo}
                                      </span>
                                      {" | "}
                                      {producto.estado ? "Activo" : "Inactivo"}
                                      {" | "}
                                      {producto.tipoProducto.charAt(0).toUpperCase() + producto.tipoProducto.slice(1).toLowerCase()}
                                      {" | "}
                                      {producto.categoria.nombre}
                                      {" | "}
                                      {producto.sexo.charAt(0).toUpperCase() + producto.sexo.slice(1).toLowerCase()}
                                      {productButtons(producto.id!)}
                                    </div>
                                    <ul className={styles.detailList}>
                                        {producto.detalles?.map((detalle) => (
                                            <li key={detalle.id} className={styles.detailItem}>
                                                Talle: {detalle.talle.numero} | Color: {detalle.color} | Precio: ${detalle.precio.precioVenta} | Stock: {detalle.stock} | {detalle.estado ? "Activo" : "Inactivo"}
                                                {detailButtons(detalle.id!)}
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            {openDetailsId && detalleSeleccionado && (
                <AdminModal
                    detalle={detalleSeleccionado}
                    producto={productoDelDetalle!}
                    onCloseAdminModal={() => setOpenDetailsId(null)}
                    onSuccess={fetchProd}
                />
            )}
            {openAddStockId && detalleAddStock && (
                <AddStockModal
                    detalle={detalleAddStock}
                    onCloseAddStockModal={() => setOpenAddStockId(null)}
                    onRefreshAdminData={fetchProd}
                    productoIn={productoDelDetalleAddStock!}
                />
            )}
            {openEditorProducts && productoSeleccionado && (
                    <EditProductAdmin
                      producto={productoSeleccionado}
                      onCloseEditProductAdmin={handleCloseEditorProducts}
                      onSuccess={fetchProd}
                    />
                  )}
        </div>
    );
};
