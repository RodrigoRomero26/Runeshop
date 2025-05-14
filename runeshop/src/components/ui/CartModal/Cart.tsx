import { useEffect, useRef, useState, type FC } from "react";
import styles from "./Cart.module.css";

interface cartProps {
  onCloseCart: () => void;
}

export const Cart: FC<cartProps> = ({ onCloseCart }) => {
  const modalRef = useRef<HTMLDivElement>(null);

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
            <div className={styles.containerProductCart}>
              {/* Aca se deberian traer los distintos productos */}
              <div className={styles.containerImageProductCart}>
                <img
                  src="https://imgs.search.brave.com/1EuIsDeRffUn4TbvODgTEofZPv4x2vot022dkxpGAbQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kYXNo/LnZ0ZXhhc3NldHMu/Y29tL2FycXVpdm9z/L2lkcy8xNTE4NTM1/LTUwMC1hdXRvP3Y9/NjM4NjI5NjAwNjg4/OTMwMDAwJndpZHRo/PTUwMCZoZWlnaHQ9/YXV0byZhc3BlY3Q9/dHJ1ZQ"
                  alt="Product"
                />
              </div>
              <div className={styles.containerInfoProductCart}>
                <h2>Zapatillas Pro</h2>
                <button className={styles.buttonDelete}>
                  <span className="material-symbols-outlined">delete</span>
                </button>
                <p>Talle: 42</p>
              </div>
              <div className={styles.containerAmountProductCart}>
                <button className={styles.buttonAmount}>
                  <span className="material-symbols-outlined">add</span>
                </button>
                <p>1</p>
                <button className={styles.buttonAmount}>
                  <span className="material-symbols-outlined">remove</span>
                </button>
              </div>
              <p>$000000</p>
            </div>
            <div className={styles.containerButtonYTotalCart}>
              <button className={styles.buttonCart}>
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
                $0000000
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
