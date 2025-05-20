import React from "react";
import styles from "./ProductsCatalogScreen.module.css"
import { Aside } from "../../ui/Aside/Aside";
import { Header } from "../../ui/Header/Header";
import { Footer } from "../../ui/Footer/Footer";

export const ProductsCatalogScreen = () => {
	return (
		<div className={styles.containerProductsCatalogScreen}>
			<Header />

			<div className={styles.containerProductsCatalogScreenContent}>
				<Aside />
				<Footer />
			</div>
		</div>
	);
};
