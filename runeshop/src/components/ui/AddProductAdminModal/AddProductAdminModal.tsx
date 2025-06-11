import { useState, useEffect, type FC } from "react";
import styles from "./AddProductAdminModal.module.css";
import { getCategoriasController } from "../../../controllers/CategoriaController";
import type { ICategoria } from "../../../types/ICategoria";

// Opciones estáticas
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


const TIPOS_PRODUCTO = ["ZAPATILLA", "REMERA", "CAMPERA", "BOTIN"];



interface AddProductAdminModalProps {
  onCloseAddProductAdminModal: () => void;
}

interface Detalle {
  talle: string;
  color: string;
  precio: number;
  stock: number;
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
  // Estado para selects dinámicos
  const [categorias, setCategorias] = useState<ICategoria[]>([]);
  const [marcas, setMarcas] = useState<string[]>([]);

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


  // Estado para los datos del producto
  const [producto, setProducto] = useState<Producto>({
    nombre: "",
    genero: "",
    tipoIndumentaria: "",
    categoria: "",
    marca: "",
    precio: 0,
    color: "",
    habilitado: true,
  });

  // Estado para los detalles a cargar
  const [detalles, setDetalles] = useState<Detalle[]>([]);
  const [detalleActual, setDetalleActual] = useState<Detalle>({
    talle: "",
    color: "",
    precio: 0,
    stock: 0,
    imagenes: [],
  });

  const [enviando, setEnviando] = useState(false);

  // Handlers para inputs de producto
  const handleProductoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    const checked = (target as HTMLInputElement).checked;
    setProducto((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handlers para inputs de detalle
  const handleDetalleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setDetalleActual((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  // Handler para imágenes del detalle
  const handleDetalleImagenes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setDetalleActual((prev) => ({
        ...prev,
        imagenes: [...prev.imagenes, ...Array.from(files)],
      }));
    }
  };

  // Eliminar imagen de detalle actual
  const handleDeleteDetalleImagen = (idx: number) => {
    setDetalleActual((prev) => ({
      ...prev,
      imagenes: prev.imagenes.filter((_, i) => i !== idx),
    }));
  };

  // Agregar detalle a la lista
  const handleAgregarDetalle = () => {
    if (
      !detalleActual.talle ||
      !detalleActual.color ||
      detalleActual.precio <= 0
    ) {
      alert("Completa todos los campos del detalle.");
      return;
    }
    setDetalles((prev) => [...prev, detalleActual]);
    setDetalleActual({
      talle: "",
      color: "",
      precio: 0,
      stock: 0,
      imagenes: [],
    });
  };

  // Eliminar detalle de la lista
  const handleEliminarDetalle = (idx: number) => {
    setDetalles((prev) => prev.filter((_, i) => i !== idx));
  };

  // Enviar producto y el primer detalle, luego los demás detalles con el id del producto
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !producto.nombre ||
      !producto.genero ||
      !producto.tipoIndumentaria ||
      !producto.categoria ||
      !producto.marca
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
      // 1. Enviar producto + primer detalle
      // const res = await createProductoConDetalle(producto, detalles[0]);
      // const productoCreado = res.data;
      // Simulación:
      const productoCreado = {
        ...producto,
        id: Math.floor(Math.random() * 10000),
      };

      // 2. Iterar sobre los detalles restantes y enviarlos con el id del producto creado
      for (let i = 1; i < detalles.length; i++) {
        const detalle = detalles[i];
        // await addDetalleAProducto(productoCreado.id, detalle);
        // Simulación: console.log("Enviando detalle", detalle, "a producto", productoCreado.id);
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
          {/* Formulario de producto */}
          <div className={styles.containerInputAddProductAdminModal}>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={producto.nombre}
              onChange={handleProductoChange}
            />
            <select
              name="genero"
              value={producto.genero}
              onChange={handleProductoChange}
            >
              <option disabled value="">Género</option>
              {GENEROS.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            <select
              name="tipoIndumentaria"
              value={producto.tipoIndumentaria}
              onChange={handleProductoChange}
            >
              <option disabled value="">Tipo de indumentaria</option>
              {TIPOS_PRODUCTO.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <select
              name="categoria"
              value={producto.categoria}
              onChange={handleProductoChange}
            >
              <option value="">Categoría</option>
              {categorias.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select
              name="marca"
              value={producto.marca}
              onChange={handleProductoChange}
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
              name="precio"
              placeholder="Precio base"
              value={producto.precio}
              onChange={handleProductoChange}
            />

            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="habilitado"
                checked={producto.habilitado}
                onChange={handleProductoChange}
              />
              Habilitado
            </label>
          </div>
          {/* Formulario para agregar detalles */}
          <div className={styles.containerTitleAddProductAdminModal}>
            <h2>Detalles a cargar</h2>
          </div>
          <div className={styles.containerInputAddProductAdminModal}>
            <input
              type="text"
              name="talle"
              placeholder="Talle"
              value={detalleActual.talle}
              onChange={handleDetalleChange}
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
            <input
              type="number"
              name="precio"
              placeholder="Precio"
              value={detalleActual.precio}
              onChange={handleDetalleChange}
            />
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={detalleActual.stock}
              onChange={handleDetalleChange}
            />
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
            <button
              type="button"
              className={styles.buttonAddImagesAddProductAdminModal}
              onClick={handleAgregarDetalle}
            >
              Agregar detalle a la lista
            </button>
          </div>
          {/* Lista de detalles agregados */}
          <div className={styles.containerTitleAddProductAdminModal}>
            <h3>Detalles cargados</h3>
          </div>
          <div className={styles.containerInputAddProductAdminModal}>
            {detalles.length > 0 ? (
              detalles.map((detalle, idx) => (
                <div key={idx} className={styles.detalleCard}>
                  <span>
                    <b>Talle:</b> {detalle.talle} | <b>Color:</b> {detalle.color} |{" "}
                    <b>Precio:</b> {detalle.precio} | <b>Stock:</b> {detalle.stock}
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