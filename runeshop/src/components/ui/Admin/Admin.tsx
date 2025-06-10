import { useEffect, useState } from "react";
import styles from "./Admin.module.css";
import { AdminModal } from "../AdminModal/AdminModal";
import { AddStockModal } from "../AddStockModal/AddStockModal";
import { getProductosController } from "../../../controllers/ProductoController";
import { filtersStore } from "../../../store/filtersStore";
import type { IProductoGet } from "../../../types/IProductoGet";
import type { IDetalle } from "../../../types/IDetalle";
import { EditProductAdmin } from "../EditProductAdmin/EditProductAdmin";

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

    const handleOpenEditorProducts = () => {
        setOpenEditorProducts(true);
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
                nombre: filtros.nombre,
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
        filtros.nombre,
    ]);

    const detalleSeleccionado = productos
        .flatMap((p) => p.detalles)
        .find((d) => d.id === openDetailsId);

    const detalleAddStock = productos
        .flatMap((p) => p.detalles)
        .find((d) => d.id === openAddStockId);

    const productoSeleccionado = productos.find((p) => p.id === openEditProductId);

    const productButtons = (productoId: number) => (
        <div className={styles.adminButtons}>
            <button
                onClick={handleOpenEditorProducts}
                // onClick={() => setOpenEditProductId(productoId)}
                className={styles.buttonAdmin}
                title="Editar producto"
            >
                <span className="material-symbols-outlined">edit</span>
            </button>
            <button
                className={styles.buttonAdmin}
                title="Eliminar producto"
                // onClick={...}
            >
                <span className="material-symbols-outlined">delete</span>
            </button>
        </div>
    );

    const detailButtons = (detalleId: number) => (
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
            <button
                className={styles.buttonAdmin}
                title="Eliminar detalle"
                // onClick={...}
            >
                <span className="material-symbols-outlined">delete</span>
            </button>
        </div>
    );

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
                                        <strong>{producto.modelo}</strong> | Estado: {producto.estado ? "Activo" : "Inactivo"} | Tipo Producto: {producto.tipoProducto.charAt(0).toUpperCase() + producto.tipoProducto.slice(1).toLowerCase()} | Categoría: {producto.categoria.nombre}  
                                        {productButtons(producto.id!)}
                                    </div>
                                    <ul className={styles.detailList}>
                                        {producto.detalles?.map((detalle) => (
                                            <li key={detalle.id} className={styles.detailItem}>
                                                Talle: {detalle.talle.numero} | Color: {detalle.color} | Precio: ${detalle.precio.precioVenta} | Stock: {detalle.stock}
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
                    onCloseAdminModal={() => setOpenDetailsId(null)}
                />
            )}
            {openAddStockId && detalleAddStock && (
                <AddStockModal
                    detalle={detalleAddStock}
                    onCloseAddStockModal={() => setOpenAddStockId(null)}
                />
            )}
            {/* Aquí podrías agregar un modal para editar producto si lo necesitas */}
            {openEditorProducts && (
                    <EditProductAdmin onCloseEditProductAdmin={handleCloseEditorProducts} />
                  )}
        </div>
    );
};
