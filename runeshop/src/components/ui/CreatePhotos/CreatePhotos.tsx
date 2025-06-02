
import type { FC } from "react";
import styles from "./CreatePhotos.module.css";

interface CreatePhotosProps {
  onCloseCreatePhotos: () => void;
}

export const CreatePhotos: FC<CreatePhotosProps> = ({ onCloseCreatePhotos }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.principalContainerCreatePhotos}>
        <div className={styles.containerDataCreatePothos}>
          <div className={styles.containerTitleCreatePhotos}>
            <h1>Añadir imagenes</h1>
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
          <button className={styles.buttonAddImagesAdminModalCreate}>
            Añadir imagenes
          </button>
          <div className={styles.containerButtonAdminModalCreate}>
            <button>Guardar</button>
            <button onClick={onCloseCreatePhotos}>Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
};
