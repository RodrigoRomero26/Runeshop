import type { FC } from "react";
import styles from "./EditProductAdmin.module.css";

interface EditProductAdminProps {
  onCloseEditProductAdmin: () => void;
}

export const EditProductAdmin: FC<EditProductAdminProps> = ({
  onCloseEditProductAdmin,
}) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.principalContainerEditProductAdmin}>
        <div className={styles.containerDataEditProductAdmin}>
          <div className={styles.containerTitleEditProductAdmin}>
            <h1>Editar producto</h1>
          </div>
          <div className={styles.containerInputEditProductAdmin}>
            <input type="text" name="Name" placeholder="Nombre" />
            <input type="text" name="Type" placeholder="Tipo de producto" />
            <input type="text" name="Category" placeholder="Categoria" />
          </div>
          <div className={styles.containerCheckboxEditProductAdmin}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" name="available" id="habilitado" />
                Habilitado
              </label>
            </div>
          <div className={styles.containerButtonEditProductAdmin}>
            <button>Guardar</button>
            <button onClick={onCloseEditProductAdmin}>Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
};
