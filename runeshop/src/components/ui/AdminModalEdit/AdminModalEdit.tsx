import { useState, type FC } from "react";
import styles from "./AdminModalEdit.module.css";
import type { IDetalle } from "../../../types/IDetalle";
import { talleDisponibleController } from "../../../controllers/TalleController";
import { precioDisponibleController } from "../../../controllers/PrecioController";
import { createImagenController } from "../../../controllers/ImagenController";
import type { IProductoGet } from "../../../types/IProductoGet";
import { updateDetalleController } from "../../../controllers/DetalleController";
import type { IImagenGet } from "../../../types/IImagenGet";

interface adminModalEditProps {
    detalle: IDetalle;
    producto: IProductoGet;
    onCloseAdminModalEdit: () => void;
    onSuccess?: () => void; 
}

export const AdminModalEdit: FC<adminModalEditProps> = ({
    detalle,
    producto,
    onCloseAdminModalEdit,
    onSuccess 
}) => {
    const [formData, setFormData] = useState({
        talle: detalle.talle?.numero ?? "",
        precio: detalle.precio?.precioVenta ?? 0,
        precioCompra: detalle.precio?.precioCompra ?? 0,
        color: detalle.color ?? "",
        marca: detalle.marca ?? "",
        imagenes: detalle.imagenes ?? [],
        nuevasImagenes: [] as File[],
    });

    const [loading, setLoading] = useState(false); 

const COLORES = [
  "Negro",
  "Blanco",
  "Rojo",
  "Azul",
  "Verde",
  "Amarillo",
  "Gris",
  "Rosa",
  "Naranja",
  "Marrón",
];

const MARCAS = [
  "ADIDAS", "PUMA", "NIKE", "REEBOK"

];

    const handleDeleteImagen = (idx: number) => {
        setFormData(prev => ({
            ...prev,
            imagenes: prev.imagenes.filter((_, i) => i !== idx),
        }));
    };

    const handleDeleteNuevaImagen = (idx: number) => {
        setFormData(prev => ({
            ...prev,
            nuevasImagenes: prev.nuevasImagenes.filter((_, i) => i !== idx),
        }));
    };

    const handleAddImages = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setFormData(prev => ({
                ...prev,
                nuevasImagenes: [...prev.nuevasImagenes, ...Array.from(files)],
            }));
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "number" ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true); 
        try {
            const talle = await talleDisponibleController(formData.talle);
            const precio = await precioDisponibleController(formData.precio, formData.precioCompra);

            let imagenes: IImagenGet[] | null = [];
            if (formData.nuevasImagenes.length > 0) {
                imagenes = await createImagenController(formData.nuevasImagenes);
            }

            const { detalles, ...productoSinDetalles } = producto;

            const updatedDetalle = {
                id: detalle.id,
                color: formData.color,
                estado: detalle.estado,
                marca: formData.marca,
                producto: productoSinDetalles,
                descuentos: detalle.descuentos,
                precio_descuento: detalle.precio_descuento,
                inicioDescuento: detalle.inicioDescuento,
                finDescuento: detalle.finDescuento,
                stock: detalle.stock,
                talle: talle,
                precio: precio,
                imagenes: [...formData.imagenes, ...(imagenes || [])],
            };
            await updateDetalleController(updatedDetalle);
            if (onSuccess) onSuccess();
            onCloseAdminModalEdit();
        } catch (err) {
            alert("Error al actualizar el detalle");
        } finally {
            setLoading(false);
        }
    };

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
                        <div className={styles.sizeInput}>
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
                        </div>
                        <div className={styles.rowInputs}>
                            <label>
                                <strong>Precio venta:</strong>
                                <input
                                    type="number"
                                    name="precio"
                                    placeholder="Precio venta"
                                    value={formData.precio}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                <strong>Precio compra:</strong>
                                <input
                                    type="number"
                                    name="precioCompra"
                                    placeholder="Precio compra"
                                    value={formData.precioCompra}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <div className={styles.selectsRow}>
                          <label>
                            <strong>Color:</strong>
                            <select
                              name="color"
                              value={formData.color}
                              onChange={handleChange}
                            >
                              {COLORES.map(color => (
                                <option key={color} value={color}>{color}</option>
                              ))}
                            </select>
                          </label>
                          <label>
                            <strong>Marca:</strong>
                            <select
                              name="marca"
                              value={formData.marca || ""}
                              onChange={handleChange}
                            >
                              {MARCAS.map(marca => (
                                <option key={marca} value={marca}>{marca}</option>
                              ))}
                            </select>
                          </label>
                        </div>
                        <div>
                            <strong>Imágenes actuales:</strong>
                            <div className={styles.containerImageAdminModal}>
                                {formData.imagenes.length > 0 ? (
                                    formData.imagenes.map((img, idx) => (
                                        <div key={idx} className={styles.imageWrapperColumn}>
                                            <img
                                                className={styles.imageAdminModal}
                                                src={img.imagenUrl}
                                                alt={`Producto imagen ${idx + 1}`}
                                            />
                                            <button
                                                type="button"
                                                className={styles.deleteImageButtonBelow}
                                                onClick={e => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    handleDeleteImagen(idx);
                                                }}
                                                title="Eliminar imagen"
                                            >Eliminar</button>
                                        </div>
                                    ))
                                ) : (
                                    <span style={{ color: "#888" }}>Sin imágenes</span>
                                )}
                            </div>
                        </div>

                        <div>
                            <strong>Nuevas imágenes:</strong>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleAddImages}
                            />
                            <div className={styles.containerImageAdminModal}>
                                {formData.nuevasImagenes.length > 0 ? (
                                    formData.nuevasImagenes.map((file, idx) => (
                                        <div key={idx} className={styles.imageWrapperColumn}>
                                            <img
                                                className={styles.imageAdminModal}
                                                src={URL.createObjectURL(file)}
                                                alt={`Nueva imagen ${idx + 1}`}
                                            />
                                            <button
                                                type="button"
                                                className={styles.deleteImageButtonBelow}
                                                onClick={e => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    handleDeleteNuevaImagen(idx);
                                                }}
                                                title="Eliminar imagen"
                                            >Eliminar</button>
                                        </div>
                                    ))
                                ) : (
                                    <span style={{ color: "#888" }}>No agregaste nuevas imágenes</span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={styles.containerButtonAdminModalEdit}>
                        <button type="submit" disabled={loading}>
                            {loading ? "Guardando..." : "Guardar"}
                        </button>
                        <button type="button" onClick={onCloseAdminModalEdit} disabled={loading}>
                            Cerrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
