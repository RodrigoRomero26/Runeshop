import styles from "./AdminModal.module.css";
import { AdminModalEdit } from "../AdminModalEdit/AdminModalEdit";
import { useState, type FC } from "react";
import type { IDetalle } from "../../../types/IDetalle";
import type { IProductoGet } from "../../../types/IProductoGet";

interface adminModalProps {
  onCloseAdminModal: () => void;
  detalle: IDetalle;
  producto: IProductoGet;
  onSuccess?: () => void; 
}

export const AdminModal: FC<adminModalProps> = ({ onCloseAdminModal, detalle, producto, onSuccess }) => {
  const [openEditor, setOpenEditor] = useState(false);


  
  const handleCloseEditor = () => {
    setOpenEditor(false);
  };

  const handleOpenEditor = () => {
    setOpenEditor(true);
  };

  if (openEditor) {
    return (
      <AdminModalEdit
        detalle={detalle}
        producto={producto}
        onCloseAdminModalEdit={handleCloseEditor}
        onSuccess={onSuccess} 
      />
    );
  }

  const imagensModal = () => {
    if (!detalle.imagenes || detalle.imagenes.length === 0) {
      return (
        <div className={styles.containerImageAdminModal}>
          <img
            className={styles.imageAdminModal}
            src="https://via.placeholder.com/120"
            alt="Sin imagen"
          />
        </div>
      );
    }
    return (
      <div className={styles.containerImageAdminModal}>
        {detalle.imagenes.map((img, idx) => (
          <img
            key={idx}
            className={styles.imageAdminModal}
            src={img.imagenUrl}
            alt={`Producto imagen ${idx + 1}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.principalContainerAdminModal}>
        <div className={styles.containerDataAdminModal}>
          <div className={styles.containerTitleAdminModal}>
            <h1>Detalles producto</h1>
          </div>
          <div className={styles.containerInfoAdminModal}>
            <p>
              <strong>Talle:</strong> {detalle.talle?.numero ?? "-"}
            </p>
            <p>
              <strong>Precio venta:</strong> ${detalle.precio?.precioVenta?.toLocaleString() ?? "-"}
            </p>
            <p>
              <strong>Precio compra:</strong> ${detalle.precio?.precioCompra?.toLocaleString() ?? "-"}
            </p>
            <p>
              <strong>Color:</strong> {detalle.color ?? "-"}
            </p>
            <p>
              <strong>Stock:</strong> {detalle.stock ?? "-"}
            </p>
            <p>
              <strong>Marca:</strong> {detalle.marca ?? "-"}
            </p>
            {imagensModal()}
          </div>
          <div className={styles.containerButtonAdminModal}>
            <button onClick={handleOpenEditor}>Editar</button>
            <button onClick={onCloseAdminModal}>Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
};
