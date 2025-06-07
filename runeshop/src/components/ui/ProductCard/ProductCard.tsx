import type { FC } from "react";
import styles from "./ProductCard.module.css";
type ProductCardProps = {
	id: number;
	imageUrl: string;
	marca: string;
	modelo: string;
	precio: number;
};
type Props = {
	producto: ProductCardProps;
};
export const ProductCard: FC<Props> = ({ producto }) => {
	return (
		<div className={styles.productCard}>
			<img
				className={styles.productImage}
				src={producto.imageUrl}
				alt={`${producto.marca} ${producto.modelo}`}
			/>
			<div className={styles.productData}>
				<h3>{producto.marca}</h3>
				<div className={styles.productInformation}>
					<p>{producto.modelo}</p>
					<p>{producto.precio}</p>
				</div>
			</div>
		</div>
	);
};
