import { getAllProductosController } from "../../../controllers/ProductoController";
import type { IProducto } from "../../../types/IProducto";
import { Footer } from "../../ui/Footer/Footer";
import { Header } from "../../ui/Header/Header";
import { LandingBrandsExhibitor } from "../../ui/LandingBrandsExhibitor/LandingBrandsExhibitor";
import { ProductCarousel } from "../../ui/ProductCarousel/ProductCarousel";

import { useEffect, useState } from "react";

import styles from "./LandingScreen.module.css";

export const LandingScreen = () => {
	

	return (
		<div className={styles.containerLandingScreen}>
			<Header />
			<div className={styles.containerLandingScreenContent}>
				<ProductCarousel/>
				<LandingBrandsExhibitor />
			</div>
			<Footer />
		</div>
	);
};
