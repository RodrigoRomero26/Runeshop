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

  const detallesPorColor: { [color: string]: IDetalle[] } = {};
  product?.detalles.forEach((detalle) => {
    if (!detallesPorColor[detalle.color]) detallesPorColor[detalle.color] = [];
    detallesPorColor[detalle.color].push(detalle);
  });

  const colores = Object.keys(detallesPorColor);
  const [selectedColor, setSelectedColor] = useState(colores[0] || "");

  useEffect(() => {
    if (colores.length && !colores.includes(selectedColor)) {
      setSelectedColor(colores[0]);
    }
  }, [product, selectedColor, colores]);

  const detallesColorSeleccionado = detallesPorColor[selectedColor] || [];

  const imagenes: IImagenGet[] = detallesColorSeleccionado[0]?.imagenes || [];

  const tallesDisponibles: ITalle[] = Array.from(
    new Map(
      detallesColorSeleccionado.map((d) => [d.talle.numero, d.talle])
    ).values()
  );

  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  const [selectedTalle, setSelectedTalle] = useState<number | null>(null);

  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    setSelectedImageIdx(0);
  }, [imagenes]);

  useEffect(() => {
    setSelectedTalle(null);
  }, [selectedColor]);

  useEffect(() => {
    setCantidad(1);
  }, [selectedTalle]);

  if (loading) return <div>Cargando producto...</div>;
  if (!product) return <div>Producto no encontrado</div>;

  const detalleSeleccionado = detallesColorSeleccionado.find(
    (d) => d.talle.numero === selectedTalle
  );

  const handleAddToCart = () => {
    if (!detalleSeleccionado) {
      alert("Selecciona un talle para agregar al carrito.");
      return;
    }

    const detalleEnCarrito = usercart?.find(
      (d) => d.id === detalleSeleccionado.id
    );
    const cantidadActual = detalleEnCarrito ? detalleEnCarrito.cantidad : 0;

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
            <div className={styles.productDataContainer}>
              <div className={styles.productTitleBrandPriceColorContainer}>
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

                <div className={styles.productColors}>
                  <label
                    htmlFor="colorSelect"
                    style={{ fontWeight: 600, marginRight: 8 }}
                  >
                    Color:
                  </label>
                  <select
                    id="colorSelect"
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className={styles.productColorSelect}
                  >
                    {colores.map((color) => (
                      <option key={color} value={color}>
                        {color.charAt(0).toUpperCase() + color.slice(1).toLowerCase()}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={styles.productsSizeCuantityContainer}>
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
