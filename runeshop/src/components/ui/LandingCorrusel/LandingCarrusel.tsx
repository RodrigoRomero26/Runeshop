// components/LandingCarrusel/LandingCarrusel.tsx
import React, { useRef } from 'react';
import styles from './LandingCarrusel.module.css'; // Asegúrate de tener un archivo CSS para los estilos

// Importaciones de imágenes
import zapatillasImg from './img/zapa1.png';
import camisetaImg from './img/zapa2.jpeg';
import pantalonImg from './img/zapa3.jpg';
import gorraImg from './img/zapa4.jpg';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

// Componente de tarjeta de producto
const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <div className={styles.productCard}>
    <div className={styles.productImageContainer}>
      <img 
        src={product.image} 
        alt={product.name}
        className={styles.productImage}
      />
    </div>
    <div className={styles.productName}>{product.name}</div>
    <div className={styles.productPrice}>{product.price}</div>
  </div>
);

// Componente principal del carrusel
export const LandingCarrusel: React.FC = () => {
  const carruselRef = useRef<HTMLDivElement>(null);
  
  // Datos de productos
  const products: Product[] = [
    { id: 1, name: "Zapatillas", price: "$ 250.000", image: zapatillasImg },
    { id: 2, name: "Camiseta", price: "$ 120.000", image: camisetaImg },
    { id: 3, name: "Pantalón", price: "$ 180.000", image: pantalonImg },
    { id: 4, name: "Gorra", price: "$ 80.000", image: gorraImg },
  ];

  const scrollTo = (direction: 'prev' | 'next') => {
    if (carruselRef.current) {
      const { scrollLeft, clientWidth } = carruselRef.current;
      const scrollTo = direction === 'next' 
        ? scrollLeft + clientWidth 
        : scrollLeft - clientWidth;
      
      carruselRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={styles.carruselContainer}>
      <div className={styles.carrusel} ref={carruselRef}>
        {products.map((product) => (
          <div key={product.id} className={styles.slide}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      
      <button 
        className={`${styles.arrowButton} ${styles.prevButton}`} 
        onClick={() => scrollTo('prev')}
      >
        &lt;
      </button>
      <button 
        className={`${styles.arrowButton} ${styles.nextButton}`} 
        onClick={() => scrollTo('next')}
      >
        &gt;
      </button>
    </div>
  );
};