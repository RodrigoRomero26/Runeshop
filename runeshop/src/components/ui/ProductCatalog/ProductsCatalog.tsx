
import { ProductCard } from "../ProductCard/ProductCard";
import styles from "./ProductsCatalog.module.css";

export const ProductsCatalog = () => {
  return (
    <div className={styles.principalContainerProductsCatalog}>
      <div className={styles.containerProductsCards}>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
      </div>
    </div>
  );
};
