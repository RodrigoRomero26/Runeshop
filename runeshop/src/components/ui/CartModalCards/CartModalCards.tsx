import type { FC } from "react";
import type { IProductoGet } from "../../../types/IProductoGet";
import styles from "./CartModalCards.module.css";
import { useUser } from "../../../hooks/useUser";

type CartModalCardsProps = {
	product: IProductoGet;
};
export const CartModalCards: FC<CartModalCardsProps> = ({ product }) => {
	const {
		incrementProductQuantity,
		decrementProductQuantity,
		removeFromCart,
		showAmount,
	} = useUser();

	const handleIncrement = () => {
		incrementProductQuantity(product.id!);
	};

	const handleDecrement = () => {
		decrementProductQuantity(product.id!);
	};
	const handleRemove = () => {
		removeFromCart(product.id!);
	};
	const handleAmount = (productId: number) => {
		return showAmount(productId);
	};
	return (
		<div className={styles.cardWrapper}>
			<div className={styles.topSection}>
				<div className={styles.containerImageProductCart}>
					<img
						src={product.detalles[0].imagenes[0].imagenUrl}
						alt={product.modelo}
					/>
				</div>
				<div className={styles.containerInfoProductCart}>
					<h2>{product.modelo}</h2>
					<p>Color: {product.detalles[0].color}</p>
					<p>Talle: {product.detalles[0].talle.numero}</p>
				</div>
				<button onClick={handleRemove} className={styles.buttonDelete}>
					<span className="material-symbols-outlined">delete</span>
				</button>
			</div>
			<div className={styles.bottomSection}>
				<div className={styles.containerAmountProductCart}>
					<button onClick={handleIncrement} className={styles.buttonAmount}>
						<span className="material-symbols-outlined">add</span>
					</button>
					<p>{handleAmount(product.id!)}</p>
					<button onClick={handleDecrement} className={styles.buttonAmount}>
						<span className="material-symbols-outlined">remove</span>
					</button>
				</div>
				<p
					className={
						styles.price
					}>{`$${product.detalles[0].precio.precioVenta}`}</p>
			</div>
		</div>
	);
};
