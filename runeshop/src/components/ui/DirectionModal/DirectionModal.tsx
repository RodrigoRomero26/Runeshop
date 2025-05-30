import React, { type FC } from "react";
import styles from "./DirectionModal.module.css";

interface directionModalProps {
  onCloseDirectionModal: () => void;
}

export const DirectionModal: FC<directionModalProps> = ({
  onCloseDirectionModal,
}) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.principalContainerDirection}>
        <div className={styles.containerDataDirection}>
          <div className={styles.containerTitleDirection}>
            <span className="material-symbols-outlined">location_on</span>
            <h1>Registrar dirección</h1>
          </div>
          <div className={styles.containerInputDirection}>
            <input type="text" name="Country" placeholder="Pais" />
            <input type="text" name="Province" placeholder="Provincia" />
            <input type="text" name="Department" placeholder="Departamento" />
            <input type="number" name="Cp" placeholder="Codigo Postal" />
            <input type="teq" name="direction" placeholder="Calle y número" />
          </div>
          <div className={styles.containerButtonDirection}>
            <button>Guardar</button>
            <button onClick={onCloseDirectionModal}>Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  );
};
