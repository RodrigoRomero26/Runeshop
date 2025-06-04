import { useEffect, useRef, useState } from "react";
import styles from "./Aside.module.css";

export const Aside = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    //SE ABRE APRETANDO EL BOTON DE HOMBRES
    <>
      <div
        className={styles.menuIconMobile}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="material-symbols-outlined">filter_alt</span>
      </div>
      <div className={styles.principalContainerAside}>
        <div className={styles.filtersContainer}>
          <h2>Filtros de busqueda</h2>
          <button className={styles.buttonFilter}>Aplicar filtros</button>
          <button className={styles.buttonFilter}>Limpiar filtros</button>
          <div className={styles.filterContainer}>
            <h3>Genero</h3>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" name="Mujer" />
              Mujer
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" name="Hombre" />
              Hombre
            </label>
          </div>
          <div className={styles.filterContainer}>
            <h3>Tipo de indumentaria</h3>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" name="Remera" />
              Remera
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" name="Pantalon" />
              Pantalon
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" name="Calzado" />
              Calzado
            </label>
          </div>
          <div className={styles.filterContainer}>
            <h3>Categorias</h3>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" name="Running" />
              Running
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" name="Urbano" />
              Urbano
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" name="Casual" />
              Casual
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" name="Trail" />
              Trail
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" name="Entrenamiento" />
              Entrenamiento
            </label>
          </div>
          <div className={styles.filterContainer}>
            <h3>Marca</h3>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" name="Nike" />
              Nike
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" name="Adidas" />
              Adidas
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" name="Puma" />
              Puma
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" name="Reebok" />
              Reebok
            </label>
          </div>
          <div className={styles.filterContainer}>
            <h3>Talles</h3>
            <div className={styles.checkboxSizeContainer}>
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
          <div className={styles.filterContainer}>
            <span className="material-symbols-outlined">paid</span>
            <label className={styles.priceLabel}>
              <input type="text" placeholder="Maximo" />
            </label>
            <label className={styles.priceLabel}>
              <input type="text" placeholder="Minimo" />
            </label>
          </div>
        </div>
      </div>
      {menuOpen && (
        <div className={styles.mobileMenu} ref={menuRef}>
          <h2>Filtros de búsqueda</h2>
          <button className={styles.buttonFilter}>Aplicar filtros</button>
          <button className={styles.buttonFilter}>Limpiar filtros</button>

          <div className={styles.filterContainer}>
            <h3>Género</h3>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" name="Mujer" />
              Mujer
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" name="Hombre" />
              Hombre
            </label>
          </div>

          <div className={styles.filterContainer}>
            <h3>Tipo de indumentaria</h3>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" name="Remera" />
              Remera
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" name="Pantalon" />
              Pantalón
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" name="Calzado" />
              Calzado
            </label>
          </div>

          <div className={styles.filterContainer}>
            <h3>Categorías</h3>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" name="Running" />
              Running
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" name="Urbano" />
              Urbano
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" name="Casual" />
              Casual
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" name="Trail" />
              Trail
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" name="Entrenamiento" />
              Entrenamiento
            </label>
          </div>

          <div className={styles.filterContainer}>
            <h3>Marca</h3>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" name="Nike" />
              Nike
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" name="Adidas" />
              Adidas
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" name="Puma" />
              Puma
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" name="Reebok" />
              Reebok
            </label>
          </div>

          <div className={styles.filterContainer}>
            <h3>Talles</h3>
            <div className={styles.checkboxSizeContainer}>
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

          <div className={styles.filterContainer}>
            <span className="material-symbols-outlined">paid</span>
            <label className={styles.priceLabel}>
              <input type="text" placeholder="Máximo" />
            </label>
            <label className={styles.priceLabel}>
              <input type="text" placeholder="Mínimo" />
            </label>
          </div>
        </div>
      )}
    </>
  );
};
