import { useState, type FC } from "react";
import styles from "./AdminModalEdit.module.css";
import { EditPhotos } from "../EditPhotos/EditPhotos";
import type { IDetalle } from "../../../types/IDetalle";

interface adminModalEditProps {
    detalle: IDetalle;
    onCloseAdminModalEdit: () => void;
}

export const AdminModalEdit: FC<adminModalEditProps> = ({
    detalle,
    onCloseAdminModalEdit,
}) => {
    const [openEditorPhoto, setOpenEditorPhoto] = useState(false);

    // Estado único para el detalle
    const [formData, setFormData] = useState({
        id: detalle.id,
        talle: detalle.talle?.numero ?? "",
        precio: detalle.precio?.precioVenta ?? 0,
        color: detalle.color ?? "",
        imagenes: detalle.imagenes ?? [],
        nuevasImagenes: [] as File[],
    });

    const handleCloseEditorPhoto = () => setOpenEditorPhoto(false);
    const handleOpenEditorPhoto = () => setOpenEditorPhoto(true);

    // Inputs controlados
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "number" ? Number(value) : value,
        }));
    };

    // Para agregar nuevas imágenes (archivos)
    const handleAddImages = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setFormData(prev => ({
                ...prev,
                nuevasImagenes: [...prev.nuevasImagenes, ...Array.from(files)],
            }));
        }
    };

    // Recibe las imágenes editadas desde el modal de fotos
    const handleSavePhotos = (imagenesEditadas: any[]) => {
        setFormData(prev => ({
            ...prev,
            imagenes: imagenesEditadas,
        }));
        setOpenEditorPhoto(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí envías formData a tu controlador
        try {
            console.log("Datos enviados:", formData);
            onCloseAdminModalEdit();
        } catch (err) {
            alert("Error al actualizar el detalle");
        }
    };

    if (openEditorPhoto) {
        return (
            <EditPhotos
                onCloseEditPhotos={handleCloseEditorPhoto}
                imagenes={formData.imagenes.map(img => ({ id: img.id, url: img.imagenUrl }))}
                onSavePhotos={handleSavePhotos}
            />
        );
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.principalContainerAdminModalEdit}>
                <form
                    className={styles.containerDataAdminModalEdit}
                    onSubmit={handleSubmit}
                >
                    <div className={styles.containerTitleAdminModalEdit}>
                        <h1>Editar Detalles</h1>
                    </div>
                    <div className={styles.containerInputAdminModalEdit}>
                        <label>
                            <strong>Talle:</strong>
                            <input
                                type="number"
                                name="talle"
                                placeholder="Talle"
                                value={formData.talle}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            <strong>Precio:</strong>
                            <input
                                type="number"
                                name="precio"
                                placeholder="Precio"
                                value={formData.precio}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            <strong>Color:</strong>
                            <select
                                name="color"
                                value={formData.color}
                                onChange={handleChange}
                            >
                                <option value="">Seleccionar color</option>
                                <option value="Negro">Negro</option>
                                <option value="Blanco">Blanco</option>
                                <option value="Rojo">Rojo</option>
                                <option value="Azul">Azul</option>
                                <option value="Verde">Verde</option>
                                <option value="Amarillo">Amarillo</option>
                                <option value="Gris">Gris</option>
                                <option value="Rosa">Rosa</option>
                                <option value="Naranja">Naranja</option>
                                <option value="Marrón">Marrón</option>
                            </select>
                        </label>
                        <label>
                            <strong>Imágenes:</strong>
                            <div className={styles.containerImageAdminModal}>
                                {formData.imagenes && formData.imagenes.length > 0 ? (
                                    formData.imagenes.map((img, idx) => (
                                        <img
                                            key={idx}
                                            className={styles.imageAdminModal}
                                            src={img.imagenUrl}
                                            alt={`Producto imagen ${idx + 1}`}
                                        />
                                    ))
                                ) : (
                                    <img
                                        className={styles.imageAdminModal}
                                        src="https://via.placeholder.com/120"
                                        alt="Sin imagen"
                                    />
                                )}
                            </div>
                        </label>
                        <label>
                            <strong>Agregar nuevas imágenes:</strong>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleAddImages}
                            />
                        </label>
                    </div>
                    <button
                        type="button"
                        onClick={handleOpenEditorPhoto}
                        className={styles.buttonEditImagesAdminModalEdit}>
                        Editar imágenes
                    </button>
                    <div className={styles.containerButtonAdminModalEdit}>
                        <button type="submit">Guardar</button>
                        <button type="button" onClick={onCloseAdminModalEdit}>
                            Cerrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
