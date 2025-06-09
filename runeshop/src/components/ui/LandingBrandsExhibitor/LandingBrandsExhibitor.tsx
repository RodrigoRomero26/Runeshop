import { useNavigate } from "react-router-dom";
import { filtersStore } from "../../../store/filtersStore";
import styles from "./LandingBrandsExhibitor.module.css";

export const LandingBrandsExhibitor = () => {
	const brands = [
		{
			name: "adidas",
			image: "src/components/ui/LandingBrandsExhibitor/logos/adidas.png",
		},
		{
			name: "puma",
			image: "src/components/ui/LandingBrandsExhibitor/logos/puma.png",
		},
		{
			name: "nike",
			image: "src/components/ui/LandingBrandsExhibitor/logos/nike.png",
		},
		{
			name: "reebok",
			image: "src/components/ui/LandingBrandsExhibitor/logos/reebok.png",
		},
	];

	const { setMarcaUnica } = filtersStore();
	const navigate = useNavigate();

	const handleClick = (brand: string) => {
		setMarcaUnica(brand);
		navigate("/productsCatalog");
	};

	return (
		<div className={styles.principalContainerLandingBrandsExhibitor}>
			<div className={styles.dataContainerLandingBrandsExhibitor}>
				<div className={styles.titleContainerLandingBrandsExhibitor}>
					<h1>Marcas</h1>
				</div>
				<div className={styles.brandsExhibitorContainer}>
					{brands.map((brand) => (
						<div key={brand.name} className={styles.brandExposerContainer}>
							<button
								className={styles.logoButton}
								onClick={() => handleClick(brand.name)}>
								<img src={brand.image} alt={brand.name} />
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
