import React from "react";
import styles from "./ProductsCatalogScreen.module.css";
import { Aside } from "../../ui/Aside/Aside";
import { Header } from "../../ui/Header/Header";
import { Footer } from "../../ui/Footer/Footer";
import { CatalogHeader } from "../../ui/CatalogHeader/CatalogHeader";
import { ProductsCatalog } from "../../ui/ProductCatalog/ProductsCatalog";

export const ProductsCatalogScreen = () => {
	return (
		<div className={styles.containerProductsCatalogScreen}>
			<Header />
			<CatalogHeader />
			<div className={styles.containerProductsCatalogScreenContent}>
				<Aside />
				<ProductsCatalog />
			</div>
			<Footer />
		</div>
	);
};
