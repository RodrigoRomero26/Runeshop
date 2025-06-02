import React, { useState, type ChangeEvent } from "react";
import styles from "./AdminHeader.module.css";
import { AddProductAdminModal } from "../AddProductAdminModal/AddProductAdminModal";
export const AdminHeader = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [addProductAdminModal, setAddProductAdminModal] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleOpenAddProductAdminModal = () => {
    setAddProductAdminModal(true);
  };

  const handleCloseAddProductAdminModal = () => {
    setAddProductAdminModal(false);
  };

  return (
    <div className={styles.principalContainerAdminHeader}>
      <div className={styles.adminContainerHeader}>
          <button onClick={handleOpenAddProductAdminModal} className={styles.adminButton}>Agregar Producto</button>
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
      {addProductAdminModal && <AddProductAdminModal onCloseAddProductAdminModal={handleCloseAddProductAdminModal} />}
    </div>
  );
};
