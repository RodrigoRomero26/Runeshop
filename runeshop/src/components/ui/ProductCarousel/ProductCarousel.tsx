import React, { useEffect, useState } from "react";
import styles from "./ProductCarousel.module.css";
import { useNavigate } from "react-router";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
}

interface ProductCarouselProps {
  products: Product[];
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({
  products,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [numVisible, setNumVisible] = useState(
    window.innerWidth >= 1024 ? 5 : 3
  );
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateNumVisible = () => {
      setNumVisible(window.innerWidth >= 1024 ? 5 : 3);
    };

    window.addEventListener("resize", updateNumVisible);
    return () => window.removeEventListener("resize", updateNumVisible);
  }, []);

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [products.length, isHovered]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const navigate = useNavigate();
  
  const handleProductClick = (id: number, isCenter: boolean) => {
    if (isCenter) {
		navigate("/product")
    }
  };

  const getVisibleProducts = () => {
    const total = products.length;
    const indices = [];

    for (
      let i = -Math.floor(numVisible / 2);
      i <= Math.floor(numVisible / 2);
      i++
    ) {
      indices.push((currentIndex + i + total) % total);
    }

    return indices.map((i) => ({
      index: i,
      product: products[i],
    }));
  };

  const visibleProducts = getVisibleProducts();

  return (
    <div className={styles.carouselContainer}>
      <button className={styles.navButton} onClick={handlePrev}>
        <span className="material-symbols-outlined">arrow_back</span>
      </button>

      <div className={styles.carouselTrack}>
        {visibleProducts.map(({ index, product }, i) => {
          const isCenter = i === Math.floor(visibleProducts.length / 2);

          return (
            <div
              key={product.id}
              className={`${styles.carouselItem} ${
                isCenter ? styles.active : ""
              }`}
              onClick={() => handleProductClick(product.id, isCenter)}
              onMouseEnter={() => isCenter && setIsHovered(true)}
              onMouseLeave={() => isCenter && setIsHovered(false)}
              style={{ cursor: "pointer" }}
            >
              <img src={product.image} alt={product.name} />
              <p>{product.name}</p>
              <p>${product.price.toLocaleString("es-AR")}</p>
            </div>
          );
        })}
      </div>

      <button className={styles.navButton} onClick={handleNext}>
        <span className="material-symbols-outlined">arrow_forward</span>
      </button>
    </div>
  );
};
