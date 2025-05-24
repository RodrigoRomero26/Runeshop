import React from "react";
import styles from "./ProductCard.module.css";
export const ProductCard = () => {
  return (
    <div className={styles.productCard}>
      <img
        className={styles.productImage}
        src="https://imgs.search.brave.com/1EuIsDeRffUn4TbvODgTEofZPv4x2vot022dkxpGAbQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kYXNo/LnZ0ZXhhc3NldHMu/Y29tL2FycXVpdm9z/L2lkcy8xNTE4NTM1/LTUwMC1hdXRvP3Y9/NjM4NjI5NjAwNjg4/OTMwMDAwJndpZHRo/PTUwMCZoZWlnaHQ9/YXV0byZhc3BlY3Q9/dHJ1ZQ"
        alt="Product 2"
      />
      <div className={styles.productData}>
        <h3>Nike</h3>
        <div className={styles.productInformation}>
          <p>Zapatilla Pro</p>
          <p>$200.000</p>
        </div>
      </div>
    </div>
  );
};
