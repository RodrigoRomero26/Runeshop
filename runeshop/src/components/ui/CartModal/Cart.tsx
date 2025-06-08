import { useEffect, useRef, useState, type FC } from "react";
import styles from "./Cart.module.css";
import { CartModalCards } from "../CartModalCards/CartModalCards";
import { useNavigate } from "react-router";
import { useUser } from "../../../hooks/useUser";
import { userStore } from "../../../store/userStore";

interface cartProps {
  onCloseCart: () => void;
}

export const Cart: FC<cartProps> = ({ onCloseCart }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const usercart = userStore((state) => state.usercart);

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

  return (
    <div className={styles.overlay}>
      <div className={styles.principalContainerCart} ref={modalRef}>
        <div className={styles.containerDataCart}>
          <div className={styles.containerTitleCart}>
            <h1>Carrito</h1>
          </div>
          <div className={styles.containerProductsCart}>
            {usercart && usercart.length > 0 ? (
              usercart.map((product) => (
                <CartModalCards
                  key={product.id}
                  product={product}
                />
              ))
            ) : (
              <p className={styles.emptyCart}>El carrito está vacío</p>
            )}
          </div>
          <div className={styles.containerButtonYTotalCart}>
            <button onClick={handleCart} className={styles.buttonCart}>
              Realizar compra
              <p>
                <span className="material-symbols-outlined ${styles.iconCart}">
                  payments
                </span>
              </p>
            </button>
            <p>
              Total:
              <br />
              {usercart && usercart.length > 0
                ? `$${usercart.reduce(
                    (total, product) =>
                      total + product.detalles[0].precio.precioVenta * product.cantidad,
                    0
                  )}`
                : "$0"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
