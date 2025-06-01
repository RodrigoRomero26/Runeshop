import { useState, type FC } from "react";
import styles from "./AdminModalEdit.module.css";
import { EditPhotos } from "../EditPhotos/EditPhotos";

interface adminModalEditProps {
  onCloseAdminModalEdit: () => void;
}

export const AdminModalEdit: FC<adminModalEditProps> = ({ onCloseAdminModalEdit }) => {
const [openEditorPhoto, setOpenEditorPhoto] = useState(false);

  const handleCloseEditorPhoto = () => {
    setOpenEditorPhoto(false);
  };

  const handleOpenEditorPhoto = () => {
    setOpenEditorPhoto(true);
  };
    if (openEditorPhoto) {
        return <EditPhotos onCloseEditPhotos={handleCloseEditorPhoto} />;
    }

  return (
    <div className={styles.overlay}>
      <div className={styles.principalContainerAdminModalEdit}>
        <div className={styles.containerDataAdminModalEdit}>
          <div className={styles.containerTitleAdminModalEdit}>
            <h1>Editar producto</h1>
          </div>
          <div className={styles.containerInputAdminModalEdit}>
            <input type="text" name="Name" placeholder="Nombre (talle)" />
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
          <div className={styles.containerCheckboxAdminModalEdit}>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" name="available" id="habilitado" />
              Habilitado
            </label>
          </div>
          <button onClick={handleOpenEditorPhoto} className={styles.buttonEditImagesAdminModalEdit}>
            Editar imagenes
          </button>
          <div className={styles.containerButtonAdminModalEdit}>
            <button>Guardar</button>
            <button onClick={onCloseAdminModalEdit}>Cerrar</button>
          </div>
        </div>
      </div>
      {openEditorPhoto && (
        <EditPhotos onCloseEditPhotos={handleCloseEditorPhoto} />
      )}
    </div>
  );
};