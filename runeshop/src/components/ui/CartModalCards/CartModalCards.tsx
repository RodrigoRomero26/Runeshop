import type { FC } from "react";
import type { IDetalle } from "../../../types/IDetalle";
import styles from "./CartModalCards.module.css";
import { useUser } from "../../../hooks/useUser";

type CartModalCardsProps = {
  detalle: IDetalle & { cantidad: number };
};

export const CartModalCards: FC<CartModalCardsProps> = ({ detalle }) => {
  const {
    incrementProductQuantity,
    decrementProductQuantity,
    removeFromCart,
    showDetailAmount,
  } = useUser();

  const handleIncrement = () => {
    incrementProductQuantity(detalle.id!);
  };

  const handleDecrement = () => {
    decrementProductQuantity(detalle.id!);
  };

  const handleRemove = () => {
    removeFromCart(detalle.id!);
  };

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.topSection}>
        <div className={styles.containerImageProductCart}>
          <img
            src={detalle.imagenes[0]?.imagenUrl}
            alt={detalle.producto.modelo}
          />
        </div>
        <div className={styles.containerInfoProductCart}>
          <h2>{detalle.producto.modelo}</h2>
          <p>Color: {detalle.color}</p>
          <p>Talle: {detalle.talle.numero}</p>
        </div>
        <button onClick={handleRemove} className={styles.buttonDelete}>
          <span className="material-symbols-outlined">delete</span>
        </button>
      </div>
      <div className={styles.bottomSection}>
        <div className={styles.containerAmountProductCart}>
          <button onClick={handleDecrement} className={styles.buttonAmount}>
            <span className="material-symbols-outlined">remove</span>
          </button>
          <p>{showDetailAmount(detalle.id!)}</p>
          <button onClick={handleIncrement} className={styles.buttonAmount}>
            <span className="material-symbols-outlined">add</span>
          </button>
        </div>
        <p className={styles.price}>
          {detalle.precio_descuento
            ? `$${detalle.precio_descuento}`
            : `$${detalle.precio.precioVenta}`}
        </p>
      </div>
    </div>
  );
};
