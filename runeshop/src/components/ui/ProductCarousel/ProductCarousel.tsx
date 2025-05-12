import React, { useEffect, useState } from "react";
import styles from "./ProductCarousel.module.css";


interface Product {
  id: number;
  name: string;
  image: string;
}

interface ProductCarouselProps {
  products: Product[];
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [numVisible, setNumVisible] = useState(window.innerWidth >= 1024 ? 5 : 3);

  useEffect(() => {
    const updateNumVisible = () => {
      setNumVisible(window.innerWidth >= 1024 ? 5 : 3);
    };

    window.addEventListener('resize', updateNumVisible);
    return () => window.removeEventListener('resize', updateNumVisible);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const handleProductClick = (id: number) => {
    console.log(`/producto/${id}`);
  };

  const getVisibleProducts = () => {
    const total = products.length;
    const indices = [];

    for (let i = -Math.floor(numVisible / 2); i <= Math.floor(numVisible / 2); i++) {
      indices.push((currentIndex + i + total) % total);
    }

    return indices.map((i) => products[i]);
  };

  const visibleProducts = getVisibleProducts();

  return (
    <div className={styles.carouselContainer}>
      <button className={styles.navButton} onClick={handlePrev}>‹</button>

      <div className={styles.carouselTrack}>
        {visibleProducts.map((product, i) => {
          const isCenter = i === Math.floor(visibleProducts.length / 2); 

          return (
            <div
              key={product.id}
              className={`${styles.carouselItem} ${isCenter ? styles.active : ''}`}
              onClick={isCenter ? () => handleProductClick(product.id) : undefined}
              style={{ cursor: isCenter ? 'pointer' : 'default' }}
            >
              <img src={product.image} alt={product.name} />
              <p>{product.name}</p>
            </div>
          );
        })}
      </div>

      <button className={styles.navButton} onClick={handleNext}>›</button>
    </div>
  );
};