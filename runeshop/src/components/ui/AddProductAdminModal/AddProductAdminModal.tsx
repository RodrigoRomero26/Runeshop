import { useState, useEffect, type FC } from "react";
import styles from "./AddProductAdminModal.module.css";
import { getCategoriasController } from "../../../controllers/CategoriaController";
import type { ICategoria } from "../../../types/ICategoria";
import { precioDisponibleController } from "../../../controllers/PrecioController";
import { talleDisponibleController } from "../../../controllers/TalleController";
import type { ITalle } from "../../../types/ITalle";
import type { IPrecio } from "../../../types/IPrecio";
import { crearProductoController } from "../../../controllers/ProductoController";
import { agregarDetalleController } from "../../../controllers/DetalleController";

const GENEROS = ["MUJER", "HOMBRE"];
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

const TIPOS_PRODUCTO = ["ZAPATILLA", "REMERA", "CAMPERA", "BOTIN", "PANTALON"];
const marcas = ["ADIDAS", "PUMA", "NIKE", "REEBOK"];

interface AddProductAdminModalProps {
  onCloseAddProductAdminModal: () => void;
}

interface Detalle {
  color: string;
  estado: boolean;
  marca: string;
  stock: number;
  talles: ITalle;
  precio: IPrecio;
  imagenes: File[];
}

interface Producto {
  nombre: string;
  genero: string;
  tipoIndumentaria: string;
  categoria: string;
  marca: string;
  precio: number;
  color: string;
  habilitado: boolean;
}

export const AddProductAdminModal: FC<AddProductAdminModalProps> = ({
  onCloseAddProductAdminModal,
}) => {
  const [categorias, setCategorias] = useState<ICategoria[]>([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const cats = await getCategoriasController();
        setCategorias(cats || []);
      } catch {
        setCategorias([]);
      }
    };
    fetchCategorias();
  }, []);

  const [producto, setProducto] = useState({
    modelo: "",
    sexo: "",
    tipoProducto: "",
    categoriaId: "",
  });

  const [detalles, setDetalles] = useState<Detalle[]>([]);
  const [detalleActual, setDetalleActual] = useState<Detalle>({
    color: "",
    estado: true,
    marca: "",
    stock: 0,
    talles: { numero: 0 },
    precio: { precioVenta: 0, precioCompra: 0 },
    imagenes: [],
  });

  const [enviando, setEnviando] = useState(false);

  const handleProductoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value } = target;
    setProducto((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDetalleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setDetalleActual((prev) => {
      if (name === "talle") {
        return { ...prev, talles: { ...prev.talles, numero: Number(value) } };
      }
      if (name === "precioVenta" || name === "precioCompra") {
        return {
          ...prev,
          precio: {
            ...prev.precio,
            [name]: Number(value),
          },
        };
      }
      if (name === "estado") {
        return { ...prev, estado: value === "true" };
      }
      return {
        ...prev,
        [name]: type === "number" ? Number(value) : value,
      };
    });
  };

  const handleDetalleImagenes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setDetalleActual((prev) => ({
        ...prev,
        imagenes: [...prev.imagenes, ...Array.from(files)],
      }));
    }
  };

  const handleDeleteDetalleImagen = (idx: number) => {
    setDetalleActual((prev) => ({
      ...prev,
      imagenes: prev.imagenes.filter((_, i) => i !== idx),
    }));
  };

  const limpiarDetalle = (detalle: Detalle) => ({
    ...detalle,
    precio: {
      id: detalle.precio.id,
      precioVenta: detalle.precio.precioVenta,
      precioCompra: detalle.precio.precioCompra,
    },
    talle: {
      id: detalle.talles.id,
      numero: detalle.talles.numero,
    },
  });

  const handleAgregarDetalle = () => {
    if (
      !detalleActual.talles.numero ||
      !detalleActual.precio.precioVenta ||
      !detalleActual.precio.precioCompra ||
      !detalleActual.color ||
      !detalleActual.marca ||
      detalleActual.stock <= 0
    ) {
      console.log(detalleActual);
      alert("Completa todos los campos del detalle.");
      return;
    }
    setDetalles((prev) => [...prev, detalleActual]);
    setDetalleActual({
      color: "",
      estado: true,
      marca: "",
      stock: 0,
      talles: { numero: 0 },
      precio: { precioVenta: 0, precioCompra: 0 },
      imagenes: [],
    });
  };

  const handleEliminarDetalle = (idx: number) => {
    setDetalles((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !producto.modelo ||
      !producto.sexo ||
      !producto.tipoProducto ||
      !producto.categoriaId
    ) {
      alert("Completa todos los campos del producto.");
      return;
    }
    if (detalles.length === 0) {
      alert("Agrega al menos un detalle.");
      return;
    }
    setEnviando(true);
    try {
      const productoCreado = {
        categoriaId: Number(producto.categoriaId),
        modelo: producto.modelo,
        sexo: producto.sexo,
        tipoProducto: producto.tipoProducto,
      };

      // --- PRIMER DETALLE ---
      const primerDetalle = detalles[0];
      const precioFormado = await precioDisponibleController(
        primerDetalle.precio.precioVenta,
        primerDetalle.precio.precioCompra
      );
      const talleFormado = await talleDisponibleController(
        primerDetalle.talles.numero
      );

      const primerDetalleLimpio = limpiarDetalle({
        ...primerDetalle,
        precio: precioFormado,
        talles: talleFormado,
      });

      if (
        primerDetalleLimpio.talle.id === undefined ||
        primerDetalleLimpio.precio.id === undefined
      ) {
        throw new Error("Talle o precio no tienen id definido.");
      }
      const primerDetalleApi = {
        color: primerDetalleLimpio.color,
        estado: primerDetalleLimpio.estado,
        marca: primerDetalleLimpio.marca,
        stock: primerDetalleLimpio.stock,
        talles: { id: primerDetalleLimpio.talle.id as number },
        precio: { id: primerDetalleLimpio.precio.id as number },
      };

      // Crear producto con el primer detalle e imágenes
      const productoRecibido = await crearProductoController(
        productoCreado,
        primerDetalleApi,
        primerDetalle.imagenes
      );

      // --- RESTO DE DETALLES ---
      for (let i = 1; i < detalles.length; i++) {
        const detalle = detalles[i];
        const precioFormadoDetalle = await precioDisponibleController(
          detalle.precio.precioVenta,
          detalle.precio.precioCompra
        );
        const talleFormadoDetalle = await talleDisponibleController(
          detalle.talles.numero
        );

        const detalleLimpio = limpiarDetalle({
          ...detalle,
          precio: precioFormadoDetalle,
          talles: talleFormadoDetalle,
        });

        if (
          detalleLimpio.talle.id === undefined ||
          detalleLimpio.precio.id === undefined
        ) {
          throw new Error("Talle o precio no tienen id definido.");
        }
        const detalleApi = {
          color: detalleLimpio.color,
          estado: detalleLimpio.estado,
          marca: detalleLimpio.marca,
          stock: detalleLimpio.stock,
          talles: { id: detalleLimpio.talle.id as number },
          precio: { id: detalleLimpio.precio.id as number },
          producto: { id: productoRecibido.id },
        };
        
        await agregarDetalleController(
          detalleApi,
          productoRecibido.id,
          detalle.imagenes
        );
      }

      alert("Producto y detalles cargados correctamente.");
      onCloseAddProductAdminModal();
    } catch (err) {
      alert("Error al guardar el producto");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.principalContainerAddProductAdminModal}>
        <form
          className={styles.containerDataAddProductAdminModal}
          onSubmit={handleSubmit}
        >
          <div className={styles.containerTitleAddProductAdminModal}>
            <h1>Añadir producto</h1>
          </div>
          <div className={styles.containerInputAddProductAdminModal}>
            <input
              type="text"
              name="modelo"
              placeholder="Modelo"
              value={producto.modelo}
              onChange={handleProductoChange}
            />
            <select
              name="sexo"
              value={producto.sexo}
              onChange={handleProductoChange}
            >
              <option disabled value="">
                Sexo
              </option>
              {GENEROS.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            <select
              name="tipoProducto"
              value={producto.tipoProducto}
              onChange={handleProductoChange}
            >
              <option disabled value="">
                Tipo de producto
              </option>
              {TIPOS_PRODUCTO.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <select
              name="categoriaId"
              value={producto.categoriaId}
              onChange={handleProductoChange}
            >
              <option value="">Categoría</option>
              {categorias.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.containerTitleAddProductAdminModal}>
            <h2>Detalles a cargar</h2>
          </div>
          <div className={styles.containerInputAddProductAdminModal}>
            <input
              type="number"
              name="talle"
              placeholder="Talle"
              value={detalleActual.talles.numero || ""}
              onChange={handleDetalleChange}
              min={1}
            />
            <select
              name="color"
              value={detalleActual.color}
              onChange={handleDetalleChange}
            >
              <option value="">Color</option>
              {COLORES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select
              name="marca"
              value={detalleActual.marca}
              onChange={handleDetalleChange}
            >
              <option value="">Marca</option>
              {marcas.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <input
              type="number"
              name="precioVenta"
              placeholder="Precio venta"
              value={detalleActual.precio.precioVenta || ""}
              onChange={handleDetalleChange}
            />
            <input
              type="number"
              name="precioCompra"
              placeholder="Precio compra"
              value={detalleActual.precio.precioCompra || ""}
              onChange={handleDetalleChange}
            />
            <label>
              Stock:
              <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={detalleActual.stock}
                onChange={handleDetalleChange}
              />
            </label>
            <div className={styles.containerAddImageAdminModal}>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleDetalleImagenes}
              />
              <div className={styles.containerImageAdminModal}>
                {detalleActual.imagenes.length > 0 ? (
                  detalleActual.imagenes.map((file, idx) => (
                    <div key={idx} className={styles.imageWrapperColumn}>
                      <img
                        className={styles.imageAdminModal}
                        src={URL.createObjectURL(file)}
                        alt={`Detalle imagen ${idx + 1}`}
                      />
                      <button
                        type="button"
                        className={styles.deleteImageButtonBelow}
                        onClick={() => handleDeleteDetalleImagen(idx)}
                        title="Eliminar imagen"
                      >
                        Eliminar
                      </button>
                    </div>
                  ))
                ) : (
                  <span style={{ color: "#888" }}>No agregaste imágenes</span>
                )}
              </div>
            </div>
            <button
              type="button"
              className={styles.buttonAddImagesAddProductAdminModal}
              onClick={handleAgregarDetalle}
            >
              Agregar detalle a la lista
            </button>
          </div>
          <div className={styles.containerTitleAddProductAdminModal}>
            <h3>Detalles cargados</h3>
          </div>
          <div className={styles.containerInputAddProductAdminModal}>
            {detalles.length > 0 ? (
              detalles.map((detalle, idx) => (
                <div key={idx} className={styles.detalleCard}>
                  <span>
                    <b>Talle:</b> {detalle.talles.numero} | <b>Color:</b>{" "}
                    {detalle.color} | <b>Precio:</b>{" "}
                    {detalle.precio.precioVenta} | <b>Stock:</b> {detalle.stock}
                  </span>
                  <button
                    type="button"
                    className={styles.deleteImageButtonBelow}
                    onClick={() => handleEliminarDetalle(idx)}
                  >
                    Eliminar
                  </button>
                </div>
              ))
            ) : (
              <span style={{ color: "#888" }}>No hay detalles cargados</span>
            )}
          </div>
          <div className={styles.containerButtonAddProductAdminModal}>
            <button type="submit" disabled={enviando}>
              {enviando ? "Guardando..." : "Guardar producto y detalles"}
            </button>
            <button type="button" onClick={onCloseAddProductAdminModal}>
              Cerrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
