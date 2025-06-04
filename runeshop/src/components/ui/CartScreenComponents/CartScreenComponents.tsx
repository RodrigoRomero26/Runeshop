import { CartModalCards } from "../CartModalCards/CartModalCards";
import styles from "./CartScreenComponents.module.css";

export const CartScreenComponents = () => {
  return (
    <div className={styles.principalContainerCartScreenComponents}>
      <div className={styles.dataContainerCartScreenComponents}>
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
        <div className={styles.summarySideContainer}>
          <div className={styles.summarySideContainerTitle}>
            <h2>Resumen</h2>
          </div>
          <div className={styles.summarySideTableContainer}>
            <table className={styles.summarySideTable}>
              <tr>
                <td>Productos (3)</td>
                <td>$435000</td>
              </tr>
              <tr>
                <td>Entrega</td>
                <td>$6000</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>$441000</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>$441000</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>$441000</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>$441000</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>$441000</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>$441000</td>
              </tr>
            </table>
          </div>
          <button className={styles.summarySideContainerButton}>
            Ir a pagar
          </button>
        </div>
      </div>
    </div>
  );
};
