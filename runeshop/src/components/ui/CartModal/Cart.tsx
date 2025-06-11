import { useEffect, useRef, type FC } from "react";
import styles from "./Cart.module.css";
import { CartModalCards } from "../CartModalCards/CartModalCards";
import { useNavigate } from "react-router";
import { useUser } from "../../../hooks/useUser";

interface cartProps {
  onCloseCart: () => void;
}

export const Cart: FC<cartProps> = ({ onCloseCart }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const {
    usercart,
  } = useUser();

  const handleCart = () => {
    navigate("/cart");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onCloseCart();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onCloseCart]);

  const total = usercart && usercart.length > 0
    ? usercart.reduce(
        (sum, detalle) =>
          sum +
          ((detalle.precio_descuento ?? detalle.precio.precioVenta) * detalle.cantidad),
        0
      )
    : 0;

  return (
    <div className={styles.overlay}>
      <div className={styles.principalContainerCart} ref={modalRef}>
        <div className={styles.containerDataCart}>
          <div className={styles.containerTitleCart}>
            <h1>Carrito</h1>
          </div>
          <div className={styles.containerProductsCart}>
            {usercart && usercart.length > 0 ? (
              usercart.map((detalle) => (
                <CartModalCards
                  key={detalle.id}
                  detalle={detalle}
                />
              ))
            ) : (
              <p className={styles.emptyCart}>El carrito está vacío</p>
            )}
          </div>
          <div className={styles.containerButtonYTotalCart}>
            <button onClick={handleCart} className={styles.buttonCart}>
              Realizar compra
              <span className={`material-symbols-outlined ${styles.iconCart}`}>
                payments
              </span>
            </button>
            <p>
              Total:
              <br />
              ${total}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
