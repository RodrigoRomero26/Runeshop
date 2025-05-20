import { useEffect, useRef, useState, type FC } from "react";
import styles from "./Cart.module.css";
import { CartModalCards } from "../CartModalCards/CartModalCards";
import { useNavigate } from "react-router";

interface cartProps {
	onCloseCart: () => void;
}

export const Cart: FC<cartProps> = ({ onCloseCart }) => {
	const modalRef = useRef<HTMLDivElement>(null);
	const navigate = useNavigate();

	const handleCart = () => {
		navigate("/cart");
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node)
			) {
				onCloseCart();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [onCloseCart]);

	return (
		<div className={styles.overlay}>
			<div className={styles.principalContainerCart} ref={modalRef}>
				<div className={styles.containerDataCart}>
					<div className={styles.containerTitleCart}>
						<h1>Carrito</h1>
					</div>
					<div className={styles.containerProductsCart}>
						{/* Aquí se pueden mapear los productos del carrito */}
            <CartModalCards />
            <CartModalCards />
            <CartModalCards />
            <CartModalCards />
            
					</div>
					<div className={styles.containerButtonYTotalCart}>
						<button onClick={handleCart} className={styles.buttonCart}>
							Realizar compra
							<p>
								<span className="material-symbols-outlined ${styles.iconCart}">
									payments
								</span>
							</p>
						</button>
						<p>
							Total:
							<br />
							$0000000
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
