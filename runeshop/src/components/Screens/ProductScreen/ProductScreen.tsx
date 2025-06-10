import React from "react";
import styles from "./ProductScreen.module.css";
import { Header } from "../../ui/Header/Header";
import { Footer } from "../../ui/Footer/Footer";
import { ProductScreenComponents } from "../../ui/ProductScreenComponents/ProductScreenComponents";

export const ProductScreen = () => {
	return (
		<div className={styles.containerProductScreen}>
			<Header />
			<div className={styles.containerProductScreenContent}>
				<ProductScreenComponents />
			</div>
			<Footer />
		</div>
	);
};
