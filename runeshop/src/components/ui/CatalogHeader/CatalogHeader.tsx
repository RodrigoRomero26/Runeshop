import { filtersStore } from "../../../store/filtersStore";
import styles from "./CatalogHeader.module.css";

export const CatalogHeader = () => {
	const { order, setOrder, modelo, setModelo } = filtersStore();

	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setOrder(event.target.value);
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setModelo(event.target.value);
	};

	return (
		<div className={styles.principalContainerCatalogHeader}>
			<div className={styles.catalogContainerHeader}>
				<div className={styles.catalogTitle}>
					<h2>Catalogo</h2>
				</div>
				<div className={styles.catalogSearch}>
					<div>
						<input
							type="text"
							name="productFind"
							placeholder="Buscar producto"
							value={modelo}
							onChange={handleInputChange}
						/>
					</div>
					<div className={styles.catalogOrder}>
						<select
							id="mi-dropdown"
							value={order}
							onChange={handleChange}>
							<option value="">Ordenar por</option>
							<option value="desc">Mayor precio</option>
							<option value="asc">Menor precio</option>
						</select>
					</div>
				</div>
			</div>
		</div>
	);
};
