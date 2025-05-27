import React from "react";
import styles from "./ProductScreenComponents.module.css";
export const ProductScreenComponents = () => {
  return (
    <div className={styles.principalContainerProductScreenComponents}>
      {/* blanco */}
      <div className={styles.containerProductScreenComponents}>
        {/* naranja */}
        <div className={styles.productInfoContainer}>
          <div className={styles.productImagesPerspectiveContainer}>
            <img
              src="https://imgs.search.brave.com/1EuIsDeRffUn4TbvODgTEofZPv4x2vot022dkxpGAbQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kYXNo/LnZ0ZXhhc3NldHMu/Y29tL2FycXVpdm9z/L2lkcy8xNTE4NTM1/LTUwMC1hdXRvP3Y9/NjM4NjI5NjAwNjg4/OTMwMDAwJndpZHRo/PTUwMCZoZWlnaHQ9/YXV0byZhc3BlY3Q9/dHJ1ZQ"
              alt="Product"
              className={styles.productImage}
            />
            <img
              src="https://imgs.search.brave.com/1EuIsDeRffUn4TbvODgTEofZPv4x2vot022dkxpGAbQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kYXNo/LnZ0ZXhhc3NldHMu/Y29tL2FycXVpdm9z/L2lkcy8xNTE4NTM1/LTUwMC1hdXRvP3Y9/NjM4NjI5NjAwNjg4/OTMwMDAwJndpZHRo/PTUwMCZoZWlnaHQ9/YXV0byZhc3BlY3Q9/dHJ1ZQ"
              alt="Product"
              className={styles.productImage}
            />
            <img
              src="https://imgs.search.brave.com/1EuIsDeRffUn4TbvODgTEofZPv4x2vot022dkxpGAbQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kYXNo/LnZ0ZXhhc3NldHMu/Y29tL2FycXVpdm9z/L2lkcy8xNTE4NTM1/LTUwMC1hdXRvP3Y9/NjM4NjI5NjAwNjg4/OTMwMDAwJndpZHRo/PTUwMCZoZWlnaHQ9/YXV0byZhc3BlY3Q9/dHJ1ZQ"
              alt="Product"
              className={styles.productImage}
            />
            <img
              src="https://imgs.search.brave.com/1EuIsDeRffUn4TbvODgTEofZPv4x2vot022dkxpGAbQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kYXNo/LnZ0ZXhhc3NldHMu/Y29tL2FycXVpdm9z/L2lkcy8xNTE4NTM1/LTUwMC1hdXRvP3Y9/NjM4NjI5NjAwNjg4/OTMwMDAwJndpZHRo/PTUwMCZoZWlnaHQ9/YXV0byZhc3BlY3Q9/dHJ1ZQ"
              alt="Product"
              className={styles.productImage}
            />
          </div>
          <img
            src="https://imgs.search.brave.com/1EuIsDeRffUn4TbvODgTEofZPv4x2vot022dkxpGAbQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kYXNo/LnZ0ZXhhc3NldHMu/Y29tL2FycXVpdm9z/L2lkcy8xNTE4NTM1/LTUwMC1hdXRvP3Y9/NjM4NjI5NjAwNjg4/OTMwMDAwJndpZHRo/PTUwMCZoZWlnaHQ9/YXV0byZhc3BlY3Q9/dHJ1ZQ"
            alt="Product"
            className={styles.productPrincipalImage}
          />
          <div className={styles.productDetailsContainer}>
            <h2 className={styles.productTitle}>Product Title</h2>
            <p className={styles.productPrice}>$2000000</p>
            <p className={styles.productPromos}>Promos</p>
            <div className={styles.productColors}>
              <img
                src="https://imgs.search.brave.com/1EuIsDeRffUn4TbvODgTEofZPv4x2vot022dkxpGAbQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kYXNo/LnZ0ZXhhc3NldHMu/Y29tL2FycXVpdm9z/L2lkcy8xNTE4NTM1/LTUwMC1hdXRvP3Y9/NjM4NjI5NjAwNjg4/OTMwMDAwJndpZHRo/PTUwMCZoZWlnaHQ9/YXV0byZhc3BlY3Q9/dHJ1ZQ"
                alt="Product"
                className={styles.productImage}
              />
              <img
                src="https://imgs.search.brave.com/1EuIsDeRffUn4TbvODgTEofZPv4x2vot022dkxpGAbQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kYXNo/LnZ0ZXhhc3NldHMu/Y29tL2FycXVpdm9z/L2lkcy8xNTE4NTM1/LTUwMC1hdXRvP3Y9/NjM4NjI5NjAwNjg4/OTMwMDAwJndpZHRo/PTUwMCZoZWlnaHQ9/YXV0byZhc3BlY3Q9/dHJ1ZQ"
                alt="Product"
                className={styles.productImage}
              />
            </div>
            <div className={styles.productSizes}>
              <h3 className={styles.productSizesTitle}>Talles</h3>
              <div className={styles.sizeOptionsCheckboxes}>
                {[33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46].map(
                  (size) => (
                    <label key={size} className={styles.sizeLabel}>
                      <input
                        type="checkbox"
                        name={String(size)}
                        className={styles.hiddenCheckbox}
                      />
                      <span>{size}</span>
                    </label>
                  )
                )}
              </div>
            </div>
            <button className={styles.addToCartButton}>Añadir al carrito</button>
          </div>
        </div>
        <div className={styles.similarProductsContainer}>
          <h2 className={styles.similarProductsTitle}>Productos similares</h2>
          <div className={styles.similarProductsImagesContainer}>
            <img
              src="https://imgs.search.brave.com/1EuIsDeRffUn4TbvODgTEofZPv4x2vot022dkxpGAbQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kYXNo/LnZ0ZXhhc3NldHMu/Y29tL2FycXVpdm9z/L2lkcy8xNTE4NTM1/LTUwMC1hdXRvP3Y9/NjM4NjI5NjAwNjg4/OTMwMDAwJndpZHRo/PTUwMCZoZWlnaHQ9/YXV0byZhc3BlY3Q9/dHJ1ZQ"
              alt="Product"
              className={styles.productImage}
            />
            <img
              src="https://imgs.search.brave.com/1EuIsDeRffUn4TbvODgTEofZPv4x2vot022dkxpGAbQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kYXNo/LnZ0ZXhhc3NldHMu/Y29tL2FycXVpdm9z/L2lkcy8xNTE4NTM1/LTUwMC1hdXRvP3Y9/NjM4NjI5NjAwNjg4/OTMwMDAwJndpZHRo/PTUwMCZoZWlnaHQ9/YXV0byZhc3BlY3Q9/dHJ1ZQ"
              alt="Product"
              className={styles.productImage}
            />
            <img
              src="https://imgs.search.brave.com/1EuIsDeRffUn4TbvODgTEofZPv4x2vot022dkxpGAbQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kYXNo/LnZ0ZXhhc3NldHMu/Y29tL2FycXVpdm9z/L2lkcy8xNTE4NTM1/LTUwMC1hdXRvP3Y9/NjM4NjI5NjAwNjg4/OTMwMDAwJndpZHRo/PTUwMCZoZWlnaHQ9/YXV0byZhc3BlY3Q9/dHJ1ZQ"
              alt="Product"
              className={styles.productImage}
            />
            <img
              src="https://imgs.search.brave.com/1EuIsDeRffUn4TbvODgTEofZPv4x2vot022dkxpGAbQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kYXNo/LnZ0ZXhhc3NldHMu/Y29tL2FycXVpdm9z/L2lkcy8xNTE4NTM1/LTUwMC1hdXRvP3Y9/NjM4NjI5NjAwNjg4/OTMwMDAwJndpZHRo/PTUwMCZoZWlnaHQ9/YXV0byZhc3BlY3Q9/dHJ1ZQ"
              alt="Product"
              className={styles.productImage}
            />
            <img
              src="https://imgs.search.brave.com/1EuIsDeRffUn4TbvODgTEofZPv4x2vot022dkxpGAbQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kYXNo/LnZ0ZXhhc3NldHMu/Y29tL2FycXVpdm9z/L2lkcy8xNTE4NTM1/LTUwMC1hdXRvP3Y9/NjM4NjI5NjAwNjg4/OTMwMDAwJndpZHRo/PTUwMCZoZWlnaHQ9/YXV0byZhc3BlY3Q9/dHJ1ZQ"
              alt="Product"
              className={styles.productImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
