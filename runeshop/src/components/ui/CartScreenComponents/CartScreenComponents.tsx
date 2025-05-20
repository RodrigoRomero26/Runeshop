import { CartModalCards } from "../CartModalCards/CartModalCards";
import styles from "./CartScreenComponents.module.css";

export const CartScreenComponents = () => {
  return (
    //pantalla blanca del fondo
    <div className={styles.principalContainerCartScreenComponents}>
      {/* pantalla naranjita */}
      <div className={styles.dataContainerCartScreenComponents}>
        {/* lado del carrito con sus respectivas tarjetas */}
        <div className={styles.cartSideContainer}>
          <div className={styles.cartSideContainerTitle}>
            <h2>Carrito</h2>
          </div>
          <div className={styles.cartSideContainerCards}>
            <CartModalCards />
            <CartModalCards />
            <CartModalCards />
            <CartModalCards />
            <CartModalCards />
            <CartModalCards />
            <CartModalCards />
          </div>
        </div>
        {/* lado del resumen */}
        <div className={styles.summarySideContainer}>
          <div className={styles.summarySideContainerTitle}>
            <h2>Resumen</h2>
          </div>
          <div className={styles.summarySideContainerDitails}>
            <div className={styles.summarySideContainerDitailsLine}>
              <p>3 Productos</p>
              <p>Entrega</p>
              <p>Total</p>
            </div>
            <div className={styles.summarySideContainerPrice}>
              <p>$435000</p>
              <p>$6000</p>
              <p>$441000</p>
            </div>
          </div>
          <button className={styles.summarySideContainerButton}>Comprar</button>
        </div>
      </div>
    </div>
  );
};
