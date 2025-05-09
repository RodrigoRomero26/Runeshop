import { Footer } from "../../ui/Footer/Footer";
import { Header } from "../../ui/Header/Header";
import { LandingBrandsExhibitor } from "../../ui/LandingBrandsExhibitor/LandingBrandsExhibitor";
import { LandingCarrusel } from "../../ui/LandingCorrusel/LandingCarrusel";
import styles from "./LandingScreen.module.css";

export const LandingScreen = () => {

	return (
		<div className={styles.containerLandingScreen}>
			<Header />
			<div className={styles.containerLandingScreenContent}>
				<LandingCarrusel />
				<LandingBrandsExhibitor />
				<Footer />
			</div>
		</div>
	);
};
