import styles from "./AdminModal.module.css";
import { AdminModalEdit } from "../AdminModalEdit/AdminModalEdit";
import { useState, type FC } from "react";
import type { IDetalle } from "../../../types/IDetalle";

interface adminModalProps {
  onCloseAdminModal: () => void;
  detalle: IDetalle;
}

export const AdminModal: FC<adminModalProps> = ({ onCloseAdminModal, detalle }) => {
  const [openEditor, setOpenEditor] = useState(false);


  const handleCloseEditor = () => {
    setOpenEditor(false);
  };

  const handleOpenEditor = () => {
    setOpenEditor(true);
  };

if (openEditor) {
    return <AdminModalEdit onCloseAdminModalEdit={handleCloseEditor} />;
  }

  const imagensModal = () => {
    return (
      <div className={styles.containerImageAdminModal}>
        <img
          className={styles.imageAdminModal}
          src="https://th.bing.com/th/id/OIP.7yXv7DXhB_SVtqnlOcxqFAHaH6?rs=1&pid=ImgDetMain"
          alt="Product"
        />
        <img
          className={styles.imageAdminModal}
          src="https://th.bing.com/th/id/OIP.7yXv7DXhB_SVtqnlOcxqFAHaH6?rs=1&pid=ImgDetMain"
          alt="Product"
        />
        <img
          className={styles.imageAdminModal}
          src="https://th.bing.com/th/id/OIP.7yXv7DXhB_SVtqnlOcxqFAHaH6?rs=1&pid=ImgDetMain"
          alt="Product"
        />
        <img
          className={styles.imageAdminModal}
          src="https://th.bing.com/th/id/OIP.7yXv7DXhB_SVtqnlOcxqFAHaH6?rs=1&pid=ImgDetMain"
          alt="Product"
        />
        <img
          className={styles.imageAdminModal}
          src="https://th.bing.com/th/id/OIP.7yXv7DXhB_SVtqnlOcxqFAHaH6?rs=1&pid=ImgDetMain"
          alt="Product"
        />
        <img
          className={styles.imageAdminModal}
          src="https://th.bing.com/th/id/OIP.7yXv7DXhB_SVtqnlOcxqFAHaH6?rs=1&pid=ImgDetMain"
          alt="Product"
        />
        <img
          className={styles.imageAdminModal}
          src="https://th.bing.com/th/id/OIP.7yXv7DXhB_SVtqnlOcxqFAHaH6?rs=1&pid=ImgDetMain"
          alt="Product"
        />
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
            <p>Talle</p>
            <p>Hombre</p>
            <p>Nike</p>
            <p>$200.000</p>
            <p>Rojo</p>
            {imagensModal()}
          </div>
          <div className={styles.containerButtonAdminModal}>
            <button onClick={handleOpenEditor}>Editar</button>
            <button onClick={onCloseAdminModal}>Cerrar</button>
          </div>
        </div>
      </div>
      {openEditor && (
        <AdminModalEdit onCloseAdminModalEdit={handleCloseEditor} />
      )}
    </div>
  );
};
