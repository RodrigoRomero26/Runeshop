import { useState, type FC } from "react";
import styles from "./AddProductAdminModal.module.css";
import { CreatePhotos } from "../CreatePhotos/CreatePhotos";

interface AddProductAdminModalProps {
  onCloseAddProductAdminModal: () => void;
}

export const AddProductAdminModal: FC<AddProductAdminModalProps> = ({ onCloseAddProductAdminModal }) => {
const [openCreatePhoto, setOpenCreatePhoto] = useState(false);

  const handleCloseCreatePhotos = () => {
    setOpenCreatePhoto(false);
  };

  const handleOpenCreatePhotos = () => {
    setOpenCreatePhoto(true);
  };
    if (openCreatePhoto) {
        return <CreatePhotos onCloseCreatePhotos={handleCloseCreatePhotos} />;
    }

  return (
    <div className={styles.overlay}>
      <div className={styles.principalContainerAddProductAdminModal}>
        <div className={styles.containerDataAddProductAdminModal}>
          <div className={styles.containerTitleAddProductAdminModal}>
            <h1>Añadir producto</h1>
          </div>
          <div className={styles.containerInputAddProductAdminModal}>
            <input type="text" name="Name" placeholder="Nombre" />
            <input type="number" name="Size" placeholder="Talle" />
            <input type="text" name="Gender" placeholder="Genero" />
            <input
              type="text"
              name="IndumtaryType"
              placeholder="Tipo de indumentaria"
            />
            <input type="text" name="Category" placeholder="Categoria" />
            <input type="text" name="Brand" placeholder="Marca" />
            <input type="double" name="Price" placeholder="Precio" />
            <input type="text" name="Color" placeholder="Color" />
          </div>
          <div className={styles.containerCheckboxAddProductAdminModal}>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" name="available" id="habilitado" />
              Habilitado
            </label>
          </div>
          <button onClick={handleOpenCreatePhotos} className={styles.buttonAddImagesAddProductAdminModal}>
            Añadir imagen/es
          </button>
          <div className={styles.containerButtonAddProductAdminModal}>
            <button>Guardar</button>
            <button onClick={onCloseAddProductAdminModal}>Cerrar</button>
          </div>
        </div>
      </div>
      {openCreatePhoto && (
        <CreatePhotos onCloseCreatePhotos={handleCloseCreatePhotos} />
      )}
    </div>
  );
};