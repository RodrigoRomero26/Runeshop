
import type { FC } from "react";
import styles from "./EditPhotos.module.css";

interface editPhotosProps {
  onCloseEditPhotos: () => void;
}

export const EditPhotos: FC<editPhotosProps> = ({ onCloseEditPhotos }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.principalContainerEditPhotos}>
        <div className={styles.containerDataEditPothos}>
          <div className={styles.containerTitleEditPhotos}>
            <h1>Editar imagenes</h1>
          </div>
          <div className={styles.containerAllPhotos}>
            <div className={styles.containerPhotos}>
              <img
                src="https://th.bing.com/th/id/OIP.YZxt1qIMGtTRsEVzIiOkfQHaHa?rs=1&pid=ImgDetMain"
                alt="Product"
                className={styles.photos}
              />
              <button className={styles.buttonDelete}>
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
            <div className={styles.containerPhotos}>
              <img
                src="https://th.bing.com/th/id/OIP.YZxt1qIMGtTRsEVzIiOkfQHaHa?rs=1&pid=ImgDetMain"
                alt="Product"
                className={styles.photos}
              />
              <button className={styles.buttonDelete}>
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
            <div className={styles.containerPhotos}>
              <img
                src="https://th.bing.com/th/id/OIP.YZxt1qIMGtTRsEVzIiOkfQHaHa?rs=1&pid=ImgDetMain"
                alt="Product"
                className={styles.photos}
              />
              <button className={styles.buttonDelete}>
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
            <div className={styles.containerPhotos}>
              <img
                src="https://th.bing.com/th/id/OIP.YZxt1qIMGtTRsEVzIiOkfQHaHa?rs=1&pid=ImgDetMain"
                alt="Product"
                className={styles.photos}
              />
              <button className={styles.buttonDelete}>
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          </div>
          <button className={styles.buttonEditImagesAdminModalEdit}>
            Añadir imagenes
          </button>
          <div className={styles.containerButtonAdminModalEdit}>
            <button>Guardar</button>
            <button onClick={onCloseEditPhotos}>Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
};
