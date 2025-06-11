import styles from "./Aside.module.css";
import { filtersStore } from "../../../store/filtersStore";
import { getCategoriasController } from "../../../controllers/CategoriaController";
import { useEffect, useRef, useState } from "react";
import type { ICategoria } from "../../../types/ICategoria";
import type { ITalle } from "../../../types/ITalle";
import { getTallesController } from "../../../controllers/TalleController";
export const Aside = () => {
  const {
    genero,
    tipoIndumentaria,
    marcas,
    talles,
    categorias,
    precioMin,
    precioMax,
    toggleGenero,
    toggleTipoIndumentaria,
    toggleMarca,
    toggleTalle,
    toggleCategoria,
    setPrecioMin,
    setPrecioMax,
    resetFilters,
  } = filtersStore();

  const TiposIndumentariaDisponibles = [
    "Zapatilla",
    "Remera",
    "Campera",
    "Botin",
    "Pantalon",
  ];
  const [categoriasDisponibles, setCategoriasDisponibles] = useState<
    ICategoria[]
  >([]);
  const [tallesDisponibles, setTallesDisponibles] = useState<ITalle[]>([]);
  const generosDisponibles = ["Hombre", "Mujer"];

  useEffect(() => {
    const fetchFiltros = async () => {
      try {
        const categorias = await getCategoriasController();
        const talles = await getTallesController();
        setCategoriasDisponibles(categorias || []);
        setTallesDisponibles(talles || []);
      } catch (err) {
        console.error("Error cargando filtros", err);
      }
    };

    fetchFiltros();
  }, []);

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

  const asideContent = () => {
    return (
      <div className={styles.filtersContainer}>
        
        <button
          className={styles.buttonFilter}
          onClick={() => {
            resetFilters();
            console.log("Filtros limpiados", {
              genero,
              tipoIndumentaria,
              marcas,
              talles,
              precioMin,
              precioMax,
            });
          }}
        >
          Limpiar Filtros
        </button>

        <div className={styles.filterContainer}>
          <h3>Género</h3>
          {generosDisponibles.map((gen) => (
            <label key={gen} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={genero.includes(gen)}
                onChange={() => toggleGenero(gen)}
              />
              {gen}
            </label>
          ))}
        </div>

        <div className={styles.filterContainer}>
          <h3>Tipo</h3>
          {TiposIndumentariaDisponibles.map((tipo) => (
            <label key={tipo} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={tipoIndumentaria.includes(tipo)}
                onChange={() => toggleTipoIndumentaria(tipo)}
              />
              {tipo}
            </label>
          ))}
        </div>

        <div className={styles.filterContainer}>
          <h3>Categoria</h3>
          {categoriasDisponibles.map((cat) => (
            <label key={cat.id} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={categorias.includes(cat.nombre)}
                onChange={() => toggleCategoria(cat.nombre)}
              />
              {cat.nombre}
            </label>
          ))}
        </div>

        <div className={styles.filterContainer}>
          <h3>Marca</h3>
          {marcasDisponibles.map((marca) => (
            <label key={marca} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={marcas.some((m) => m.toLowerCase() === marca.toLowerCase())}
                onChange={() => toggleMarca(marca)}
              />
              {marca}
            </label>
          ))}
        </div>

        <div className={`${styles.filterContainer} ${styles.sizeContainer}`}>
          <h3>Talle</h3>
          <div className={styles.checkboxSizeContainer}>
            {tallesDisponibles.map((talle) => (
              <label key={talle.id} className={styles.sizeLabel}>
                <input
                  type="checkbox"
                  className={styles.hiddenCheckbox}
                  checked={talles.includes(talle.numero)}
                  onChange={() => toggleTalle(talle.numero)}
                />
                <span>{talle.numero}</span>
              </label>
            ))}
          </div>
        </div>

        <div className={styles.filterContainer}>
          <h3>Precio</h3>
          <div>
            <label className={styles.priceLabel}>
              <input
                type="number"
                placeholder="Mínimo"
                value={precioMin}
                onChange={(e) =>
                  setPrecioMin(
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
              />
            </label>
            <label className={styles.priceLabel}>
              <input
                type="number"
                placeholder="Máximo"
                value={precioMax}
                onChange={(e) =>
                  setPrecioMax(
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
              />
            </label>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        className={styles.menuIconMobile}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="material-symbols-outlined">filter_alt</span>
      </div>
      <aside className={styles.principalContainerAside}>{asideContent()}</aside>
      {menuOpen && (
        <div className={styles.mobileMenu} ref={menuRef}>
          {asideContent()}
        </div>
      )}
    </>
  );
};

export default Aside;

const marcasDisponibles = ["Adidas", "Puma", "Nike", "Reebok"];
