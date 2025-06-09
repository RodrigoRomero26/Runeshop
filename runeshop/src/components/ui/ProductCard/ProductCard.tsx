import type { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";
import type { IProductoGet } from "../../../types/IProductoGet";

type Props = {
	producto: IProductoGet;
};
export const ProductCard: FC<Props> = ({ producto }) => {
	const detalle = producto.detalles[0];
	const tieneDescuento = detalle.precio_descuento !== null;

	return (
		<Link
			to={`/product/${producto.id}`}
			className={styles.productCard}
			tabIndex={0}
			style={{
				textDecoration: "none",
				color: "inherit",
				cursor: "pointer",
			}}
		>
			{tieneDescuento && (
				<span className={styles.discountBadge}>¡Oferta!</span>
			)}
			<img
				className={styles.productImage}
				src={detalle.imagenes[0].imagenUrl}
				alt={`${detalle.marca} ${producto.modelo}`}
			/>
			<div className={styles.productData}>
				<h3>{detalle.marca}</h3>
				<p>{producto.modelo}</p>
				<div className={styles.productInformation}>
					{tieneDescuento ? (
						<>
							<p className={styles.oldPrice}>
								${detalle.precio.precioVenta}
							</p>
							<p className={styles.discountPrice}>
								${detalle.precio_descuento}
							</p>
						</>
					) : (
						<p>${detalle.precio.precioVenta}</p>
					)}
				</div>
			</div>
		</Link>
	);
};
