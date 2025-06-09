import { userStore } from "../../../store/userStore";
import { CartModalCards } from "../CartModalCards/CartModalCards";
import styles from "./CartScreenComponents.module.css";

export const CartScreenComponents = () => {
   const usercart = userStore((state) => state.usercart);

  return (
    <div className={styles.principalContainerCartScreenComponents}>
      <div className={styles.dataContainerCartScreenComponents}>
        <div className={styles.cartSideContainer}>
          <div className={styles.cartSideContainerTitle}>
            <h2>Carrito</h2>
          </div>
          <div className={styles.cartSideContainerCards}>
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
