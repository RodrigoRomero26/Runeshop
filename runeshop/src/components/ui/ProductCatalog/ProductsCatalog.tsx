import { LandingScreen } from "../../Screens/LandingScreen/LandingScreen";
import { ProductCarousel } from "../ProductCarousel/ProductCarousel";
import styles from "./ProductsCatalog.module.css";

export const ProductsCatalog = () => {
  return (
    <div className={styles.containerProductsCatalogScreen}>
      <div className={styles.productsOnCatalog}>
        <div className={styles.productCard}>
          
        </div>
        <div className={styles.productCard}>
          <img src="https://via.placeholder.com/150" alt="Product 2" />
          <h3>Product 2</h3>
          <p>Description of Product 2</p>
          <p>Price: $20.00</p>
        </div>
        {/* Add more product cards as needed */}
      </div>
    </div>
  );
};
