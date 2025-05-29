import React, { useState } from "react";
import styles from "./AdminHeader.module.css";
export const AdminHeader = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className={styles.principalContainerAdminHeader}>
      <div className={styles.adminContainerHeader}>
          <button className={styles.adminButton}>Agregar Producto</button>
        <div className={styles.adminSearch}>
          <div>
            <input
              type="text"
              name="productFind"
              placeholder="Buscar producto"
            />
          </div>
          <div className={styles.adminOrder}>
            <select
              id="mi-dropdown"
              value={selectedOption}
              onChange={handleChange}
            >
              <option value="">Ordenar por</option>
              <option value="opcion1">Mayor precio</option>
              <option value="opcion2">Menor precio</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
