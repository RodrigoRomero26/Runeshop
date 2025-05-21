import { useState } from "react";
import styles from "./CatalogHeader.module.css";

export const CatalogHeader = () => {
	const [selectedOption, setSelectedOption] = useState("");

	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedOption(event.target.value);
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
						/>
					</div>
					<div className={styles.catalogOrder}>
						<select
							id="mi-dropdown"
							value={selectedOption}
							onChange={handleChange}>
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
