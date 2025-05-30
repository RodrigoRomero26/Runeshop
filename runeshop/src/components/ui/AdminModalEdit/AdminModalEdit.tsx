import type { FC } from "react";
import styles from "./AdminModalEdit.module.css";

interface adminModalEditProps {
  onCloseAdminModalEdit: () => void;
}


const imagensModal = () => {
  return (
    <div className={styles.containerImageAdminModalEdit}>
      <img
        className={styles.imageAdminModalEdit}
        src="https://th.bing.com/th/id/OIP.7yXv7DXhB_SVtqnlOcxqFAHaH6?rs=1&pid=ImgDetMain"
        alt="Product"
      />
      <img
        className={styles.imageAdminModalEdit}
        src="https://th.bing.com/th/id/OIP.7yXv7DXhB_SVtqnlOcxqFAHaH6?rs=1&pid=ImgDetMain"
        alt="Product"
      />
      <img
        className={styles.imageAdminModalEdit}
        src="https://th.bing.com/th/id/OIP.7yXv7DXhB_SVtqnlOcxqFAHaH6?rs=1&pid=ImgDetMain"
        alt="Product"
      />
      <img
        className={styles.imageAdminModalEdit}
        src="https://th.bing.com/th/id/OIP.7yXv7DXhB_SVtqnlOcxqFAHaH6?rs=1&pid=ImgDetMain"
        alt="Product"
      />
      <img
        className={styles.imageAdminModalEdit}
        src="https://th.bing.com/th/id/OIP.7yXv7DXhB_SVtqnlOcxqFAHaH6?rs=1&pid=ImgDetMain"
        alt="Product"
      />
      <img
        className={styles.imageAdminModalEdit}
        src="https://th.bing.com/th/id/OIP.7yXv7DXhB_SVtqnlOcxqFAHaH6?rs=1&pid=ImgDetMain"
        alt="Product"
      />
      <img
        className={styles.imageAdminModalEdit}
        src="https://th.bing.com/th/id/OIP.7yXv7DXhB_SVtqnlOcxqFAHaH6?rs=1&pid=ImgDetMain"
        alt="Product"
      />
    </div>
  );
};


export const AdminModalEdit: FC<adminModalEditProps> = ({
  onCloseAdminModalEdit,
}) => {
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
            {imagensModal()}
            <label>
              <input type="checkbox" name="available" id="habilitado" />
              Habilitado
            </label>
          </div>
          <div className={styles.containerButtonAdminModalEdit}>
            <button>Guardar</button>
            <button onClick={onCloseAdminModalEdit}>Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
};
