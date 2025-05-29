import type { FC } from "react";
import styles from "./AdminModalEdit.module.css";

interface adminModalEditProps {
  onCloseAdminModalEdit: () => void;
}

export const AdminModalEdit : FC<adminModalEditProps> = ({ onCloseAdminModalEdit }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.principalContainerAdminModalEdit}>
        <div className={styles.containerDataAdminModalEdit}>
          <div className={styles.containerTitleAdminModalEdit}>
            <span className="material-symbols-outlined">person</span>
            <h1>Registrar usuario</h1>
          </div>
          <div className={styles.containerInputAdminModalEdit}>
            <input type="text" name="user" placeholder="Nombre de usuario" />
            <input type="text" name="name" placeholder="Nombre" />
            <input type="text" name="lastName" placeholder="Apellido" />
            <input type="text" name="mail" placeholder="Correo electrónico" />
            <input type="number" name="dni" placeholder="DNI" />
            <input type="password" name="password" placeholder="Contraseña" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar Contraseña"
            />
          </div>
          <div className={styles.containerButtonAdminModalEdit}>
            <button>Registrarse</button>
            <button onClick={onCloseAdminModalEdit}>Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  );
};
