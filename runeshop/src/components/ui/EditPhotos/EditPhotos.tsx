import type { FC } from "react";
import { useState } from "react";
import styles from "./EditPhotos.module.css";
import type { IImagen } from "../../../types/IImagen";

interface editPhotosProps {
  onCloseEditPhotos: () => void;
  imagenes: IImagen[];
  onSavePhotos: (imagenes: IImagen[]) => void;
}

export const EditPhotos: FC<editPhotosProps> = ({
  onCloseEditPhotos,
  imagenes: imagenesProp,
  onSavePhotos,
}) => {
  const [imagenes, setImagenes] = useState(imagenesProp);

  const handleDelete = (idx: number) => {
    setImagenes(imagenes.filter((_, i) => i !== idx));
  };

  // Agregar nuevas imágenes (archivos locales)
  const handleAddImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const nuevas = Array.from(files).map((file) => ({
        id: undefined,
        url: URL.createObjectURL(file),
        file,
      }));
      setImagenes((prev) => [...prev, ...nuevas]);
    }
  };

  const handleSave = () => {
    // Si tienes archivos locales, puedes filtrarlos y enviarlos como corresponda
    onSavePhotos(imagenes);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.principalContainerEditPhotos}>
        <div className={styles.containerDataEditPothos}>
          <div className={styles.containerTitleEditPhotos}>
            <h1>Editar imágenes</h1>
          </div>
          <div className={styles.containerAllPhotos}>
            <div className={styles.photosGrid}>
              {imagenes.map((img, idx) => (
                <div className={styles.containerPhotos} key={idx}>
                  <img
                    src={img.url}
                    alt="Product"
                    className={styles.photos}
                  />
                  <button
                    className={styles.buttonDelete}
                    onClick={() => handleDelete(idx)}
                    type="button"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
          <label className={styles.buttonEditImagesAdminModalEdit}>
            Añadir imágenes
            <input
              type="file"
              multiple
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleAddImages}
            />
          </label>
          <div className={styles.containerButtonAdminModalEdit}>
            <button type="button" onClick={handleSave}>
              Guardar
            </button>
            <button type="button" onClick={onCloseEditPhotos}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
