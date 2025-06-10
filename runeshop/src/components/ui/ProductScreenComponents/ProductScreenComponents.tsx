import { useState, useEffect } from "react";
import { getProductoByIdController } from "../../../controllers/ProductoController";
import styles from "./ProductScreenComponents.module.css";
import { useParams } from "react-router-dom";
import type { IDetalle } from "../../../types/IDetalle";
import type { IProductoGet } from "../../../types/IProductoGet";
import type { IImagenGet } from "../../../types/IImagenGet";
import type { ITalle } from "../../../types/ITalle";
import { useUser } from "../../../hooks/useUser";
import Swal from "sweetalert2";

export const ProductScreenComponents = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<IProductoGet | null>(null);
  const [loading, setLoading] = useState(true);

  const { addDetailToCart, usercart } = useUser();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const prod = await getProductoByIdController(Number(id));
      // Asigna el producto a cada detalle
      if (prod?.detalles) {
        prod.detalles = prod.detalles.map((detalle: IDetalle) => ({
          ...detalle,
          producto: {
            id: prod.id,
            modelo: prod.modelo,
            sexo: prod.sexo,
            tipoProducto: prod.tipoProducto,
            estado: prod.estado,
            categoria: prod.categoria,
          },
        }));
      }
      setProduct(prod);
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  // Agrupa detalles por color
  const detallesPorColor: { [color: string]: IDetalle[] } = {};
  product?.detalles.forEach((detalle) => {
    // Aquí detalle debe tener la propiedad producto
    if (!detallesPorColor[detalle.color]) detallesPorColor[detalle.color] = [];
    detallesPorColor[detalle.color].push(detalle);
  });

  const colores = Object.keys(detallesPorColor);
  const [selectedColor, setSelectedColor] = useState(colores[0] || "");

  // Actualiza el color seleccionado si cambia la data
  useEffect(() => {
    if (colores.length && !colores.includes(selectedColor)) {
      setSelectedColor(colores[0]);
    }
  }, [product, selectedColor, colores]);

  // Detalles del color seleccionado
  const detallesColorSeleccionado = detallesPorColor[selectedColor] || [];

  // Imágenes del primer detalle del color seleccionado
  const imagenes: IImagenGet[] = detallesColorSeleccionado[0]?.imagenes || [];

  // Talles disponibles (sin repetir)
  const tallesDisponibles: ITalle[] = Array.from(
    new Map(
      detallesColorSeleccionado.map((d) => [d.talle.numero, d.talle])
    ).values()
  );

  // Estado para la imagen principal seleccionada
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  // Estado para el talle seleccionado
  const [selectedTalle, setSelectedTalle] = useState<number | null>(null);

  // Estado para la cantidad a agregar
  const [cantidad, setCantidad] = useState(1);

  // Cuando cambian las imágenes (por cambio de color), resetea la imagen principal
  useEffect(() => {
    setSelectedImageIdx(0);
  }, [imagenes]);

  // Cuando cambia el color, resetea el talle seleccionado
  useEffect(() => {
    setSelectedTalle(null);
  }, [selectedColor]);

  // Cuando cambia el talle seleccionado, resetea la cantidad a 1
  useEffect(() => {
    setCantidad(1);
  }, [selectedTalle]);

  if (loading) return <div>Cargando producto...</div>;
  if (!product) return <div>Producto no encontrado</div>;

  // Busca el detalle seleccionado por color y talle
  const detalleSeleccionado = detallesColorSeleccionado.find(
    (d) => d.talle.numero === selectedTalle
  );

  const handleAddToCart = () => {
    if (!detalleSeleccionado) {
      alert("Selecciona un talle para agregar al carrito.");
      return;
    }

    // Buscar si ya está en el carrito
    const detalleEnCarrito = usercart?.find(
      (d) => d.id === detalleSeleccionado.id
    );
    const cantidadActual = detalleEnCarrito ? detalleEnCarrito.cantidad : 0;

    // Validar stock
    if (cantidadActual + cantidad > detalleSeleccionado.stock) {
      Swal.fire({
        icon: "error",
        title: "Sin stock suficiente",
        text: `No hay suficiente stock para agregar esa cantidad (stock disponible: ${
          detalleSeleccionado.stock - cantidadActual
        }).`,
      });
      return;
    }
    addDetailToCart(detalleSeleccionado, cantidad);
  };

  return (
    <div className={styles.principalContainerProductScreenComponents}>
      <div className={styles.containerProductScreenComponents}>
        <div className={styles.productInfoContainer}>
          <div className={styles.productImagesContainer}>
            <div className={styles.productImagesPerspectiveContainer}>
              {imagenes.map((img, idx) => (
                <img
                  key={idx}
                  src={img.imagenUrl}
                  alt={`Vista ${idx + 1}`}
                  className={styles.productImagePerspective}
                  style={{
                    border:
                      selectedImageIdx === idx
                        ? "2px solid #ff4d4f"
                        : "2px solid transparent",
                    cursor: "pointer",
                  }}
                  onClick={() => setSelectedImageIdx(idx)}
                />
              ))}
            </div>
            <img
              src={imagenes[selectedImageIdx]?.imagenUrl}
              alt="Principal"
              className={styles.productPrincipalImage}
            />
          </div>
          <div className={styles.productDetailsContainer}>
            <div className={styles.productTitleBrandPriceContainer}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <h2 className={styles.productTitle}>{product.modelo}</h2>
                {detallesColorSeleccionado[0]?.precio_descuento && (
                  <span className={styles.discountBadge}>¡OFERTA!</span>
                )}
              </div>
              <div className={styles.productBrand}>
                {detallesColorSeleccionado[0]?.marca}
              </div>
              <div className={styles.productPrice}>
                {detallesColorSeleccionado[0]?.precio_descuento ? (
                  <>
                    <span className={styles.oldPrice}>
                      ${detallesColorSeleccionado[0]?.precio.precioVenta}
                    </span>
                    <span className={styles.discountPrice}>
                      ${detallesColorSeleccionado[0]?.precio_descuento}
                    </span>
                  </>
                ) : (
                  <span>
                    ${detallesColorSeleccionado[0]?.precio.precioVenta}
                  </span>
                )}
              </div>
            </div>
            <div className={styles.productColorsSizesContainer}>
              <div className={styles.productColors}>
                {colores.map((color) => (
                  <button
                    key={color}
                    className={`${styles.productColorButton} ${
                      selectedColor === color ? styles.selected : ""
                    }`}
                    onClick={() => setSelectedColor(color)}
                    type="button"
                  >
                    <img
                      src={detallesPorColor[color][0]?.imagenes[0]?.imagenUrl}
                      alt={color}
                    />
                  </button>
                ))}
              </div>
              {/* Talles disponibles para el color seleccionado */}
              <div className={styles.sizesContainer}>
                <h3>Talles disponibles:</h3>
                <div className={styles.checkboxSizeContainer}>
                  {tallesDisponibles.map((talle) => (
                    <label
                      key={talle.id}
                      className={`${styles.sizeLabel} ${
                        selectedTalle === talle.numero ? styles.selected : ""
                      }`}
                    >
                      <input
                        type="radio"
                        className={styles.hiddenCheckbox}
                        name="talle"
                        checked={selectedTalle === talle.numero}
                        onChange={() => setSelectedTalle(talle.numero)}
                      />
                      <span>{talle.numero}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className={styles.quantityContainer}>
                <button
                  type="button"
                  className={styles.quantityButton}
                  onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                  disabled={cantidad <= 1}
                >
                  -
                </button>
                <span className={styles.quantityValue}>{cantidad}</span>
                <button
                  type="button"
                  className={styles.quantityButton}
                  onClick={() => {
                    if (
                      detalleSeleccionado &&
                      cantidad <
                        detalleSeleccionado.stock -
                          (usercart?.find(
                            (d) => d.id === detalleSeleccionado.id
                          )?.cantidad || 0)
                    ) {
                      setCantidad((c) => c + 1);
                    }
                  }}
                  disabled={
                    !detalleSeleccionado ||
                    cantidad >=
                      (detalleSeleccionado
                        ? detalleSeleccionado.stock -
                          (usercart?.find(
                            (d) => d.id === detalleSeleccionado.id
                          )?.cantidad || 0)
                        : 1)
                  }
                >
                  +
                </button>
              </div>
            </div>
            <button
              className={styles.addToCartButton}
              onClick={handleAddToCart}
              disabled={!detalleSeleccionado}
            >
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
