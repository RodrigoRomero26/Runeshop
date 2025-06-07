import { getAllProductosController } from "../../../controllers/ProductoController";
import type { IProducto } from "../../../types/IProducto";
import { Footer } from "../../ui/Footer/Footer";
import { Header } from "../../ui/Header/Header";
import { LandingBrandsExhibitor } from "../../ui/LandingBrandsExhibitor/LandingBrandsExhibitor";
import { ProductCarousel } from "../../ui/ProductCarousel/ProductCarousel";

import { useEffect, useState } from "react";

import styles from "./LandingScreen.module.css";
import Swal from "sweetalert2";

export const LandingScreen = () => {
	useEffect(() => {
		const expired = localStorage.getItem("sessionExpired");
		if (expired === "true") {
			Swal.fire({
				icon: "warning",
				title: "Sesión expirada",
				text: "Por seguridad, tu sesión ha caducado. Iniciá sesión nuevamente.",
				confirmButtonText: "Entendido",
			});
			localStorage.removeItem("sessionExpired");
		}
	}, []);

	return (
		<div className={styles.containerLandingScreen}>
			<Header />
			<div className={styles.containerLandingScreenContent}>
				<ProductCarousel />
				<LandingBrandsExhibitor />
			</div>
			<Footer />
		</div>
	);
};
