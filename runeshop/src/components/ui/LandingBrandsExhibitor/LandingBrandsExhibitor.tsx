import styles from "./LandingBrandsExhibitor.module.css";

export const LandingBrandsExhibitor = () => {
	return (
		<div className={styles.principalContainerLandingBrandsExhibitor}>
			<div className={styles.dataContainerLandingBrandsExhibitor}>
				<div className={styles.titleContainerLandingBrandsExhibitor}>
					<h1>Marcas</h1>
				</div>
				<div className={styles.brandsExhibitorContainer}>
					<div className={styles.brandExposerContainer}>
						<button className={styles.logoButton}>
							<img src="src\components\ui\LandingBrandsExhibitor\logos\adidas.png" alt="Adidas" />
							
						</button>
					</div>
					<div className={styles.brandExposerContainer}>
						<button className={styles.logoButton}>
							<img src="src\components\ui\LandingBrandsExhibitor\logos\puma.png" alt="Puma" />
						</button>
					</div>
					<div className={styles.brandExposerContainer}>
						<button className={styles.logoButton}>
							<img src="src\components\ui\LandingBrandsExhibitor\logos\nike.png" alt="Nike" />
						</button>
					</div>
					<div className={styles.brandExposerContainer}>
						<button className={styles.logoButton}>
							<img src="src\components\ui\LandingBrandsExhibitor\logos\reebok.png" alt="Reebok" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
