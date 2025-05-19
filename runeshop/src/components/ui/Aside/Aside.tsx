import React from "react";
import styles from "./Aside.module.css";

export const Aside = () => {
	return (
		<div className={styles.principalContainerAside}>
			<div className={styles.filtersContainer}>
				<h2>Filtros de busqueda</h2>
				<div className={styles.categoriasContainer}>
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
				<div className={styles.typeShoesContainer}>
					<h3>Tipo de calzado</h3>
					<label className={styles.checkboxLabel}>
						<input type="checkbox" name="Zapatillas" />
						Zapatillas
					</label>
					<label className={styles.checkboxLabel}>
						<input type="checkbox" name="Botines" />
						Botines
					</label>
					<label className={styles.checkboxLabel}>
						<input type="checkbox" name="Botas" />
						Botas
					</label>
					<label className={styles.checkboxLabel}>
						<input type="checkbox" name="Sandalias" />
						Sandalias
					</label>
				</div>
				<div className={styles.brandContainer}>
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
				<div className={styles.sizeContainer}>
					<h3>Talles</h3>
					<div className={styles.checkboxSizeContainer}>
						{[34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46].map(
							(size) => (
								<label key={size} className={styles.sizeLabel}>
									<input
										type="checkbox"
										name={String(size)}
										className={styles.hiddenCheckbox}
									/>
									{size}
								</label>
							)
						)}
					</div>
				</div>
				<div className={styles.priceFilterContainer}>
					<span className="material-symbols-outlined">paid</span>
					<label className={styles.priceLabel}>
						<input type="text" />
						Maximo
					</label>
					<label className={styles.priceLabel}>
						<input type="text" />
						Minimo
					</label>
				</div>
			</div>
		</div>
	);
};
