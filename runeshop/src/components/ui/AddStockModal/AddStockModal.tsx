import { useState, type FC } from "react";
import styles from "./AddStockModal.module.css";
import type { IDetalle } from "../../../types/IDetalle";
import { updateDetalleController } from "../../../controllers/DetalleController";
import type { IProductoGet } from "../../../types/IProductoGet";

// Importa tu servicio o controller para actualizar el stock
// import { updateDetalleStock } from "../../../services/DetalleService";

interface AddStockModalProps {
    onCloseAddStockModal: () => void;
    detalle: IDetalle;
    onRefreshAdminData?: () => void; 
	productoIn: IProductoGet
}

export const AddStockModal: FC<AddStockModalProps> = ({ onCloseAddStockModal, detalle, onRefreshAdminData, productoIn }) => {
    const [stockToAdd, setStockToAdd] = useState<number>(0);
    const [loading, setLoading] = useState(false);

	console.log(productoIn)

    const handleAddStock = async () => {
        if (stockToAdd <= 0) {
            alert("Ingresa una cantidad válida.");
            return;
        }
        setLoading(true);
        try {
            // Construye apiData igual que en AdminModalEdit
            const { detalles, ...productoSinDetalles } = productoIn;

            const apiData = {
                id: detalle.id,
                color: detalle.color,
                estado: detalle.estado,
                marca: detalle.marca,
                producto: productoSinDetalles,
                descuentos: detalle.descuentos,
                precio_descuento: detalle.precio_descuento,
                inicioDescuento: detalle.inicioDescuento,
                finDescuento: detalle.finDescuento,
                stock: detalle.stock + stockToAdd,
                talle: detalle.talle,
                precio: detalle.precio,
                imagenes: detalle.imagenes,
            };

            await updateDetalleController(apiData);

            alert(`Stock actualizado correctamente (+${stockToAdd})`);
            if (onRefreshAdminData) onRefreshAdminData();
            onCloseAddStockModal();
        } catch (err) {
			console.error("Error al actualizar el stock:", err);
            alert("Error al actualizar el stock");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.principalContainerAddStockModal}>
                <div className={styles.containerDataAddStockModal}>
                    <div className={styles.containerTitleAddStockModal}>
                        <h1>Añadir Stock</h1>
                        <p>Stock actual: <b>{detalle.stock}</b></p>
                    </div>
                    <div className={styles.inputContainer}>
                        <input
                            type="number"
                            name="stockToAdd"
                            placeholder="Cantidad de stock a agregar"
                            value={stockToAdd}
                            min={1}
                            onChange={e => setStockToAdd(Number(e.target.value))}
                            disabled={loading}
                        />
                    </div>
                    <div className={styles.containerButtonAddStockModal}>
                        <button onClick={handleAddStock} disabled={loading}>Añadir</button>
                        <button onClick={onCloseAddStockModal} disabled={loading}>Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
