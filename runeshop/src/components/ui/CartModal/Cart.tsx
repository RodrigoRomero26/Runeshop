import { useState, type FC } from "react";
import styles from "./Cart.module.css";

interface cartProps {
  onCloseCart: () => void;
}

// Corregir como cerrar el carro al tocar fuera del modal

export const Cart: FC<cartProps> = ({ onCloseCart }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.principalContainerCart}>
        <div className={styles.containerDataCart}>
          <div className={styles.containerTitleCart}>
            <h1>Carrito</h1>
          </div>
          <div className={styles.containerProductsCart}>
            <div className={styles.containerProductCart}></div>
          </div>
          <div className={styles.containerButtonYTotalCart}>
            <button className={styles.buttonCart}>
              Realizar compra
              <span className="material-symbols-outlined ${styles.iconCart}">payments</span>
            </button>
            <p>Total: $</p>
          </div>
        </div>
      </div>
    </div>
  );
};
