import { useState } from "react";
import styles from "./Header.module.css";
import { Login } from "../LoginModal/Login";
import { Cart } from "../CartModal/Cart";
import { useNavigate } from "react-router";

export const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const [loginOpen, setLoginOpen] = useState(false);
	const [cartOpen, setCartOpen] = useState(false);
	
	const navigate = useNavigate();

	const handleCloseLogin = () => {
		setLoginOpen(false);
	};

	const handleCloseCart = () => {
		setCartOpen(false);
	};

	const handleProductsCatalog = () => {
		navigate("/productsCatalog")
	}

	const handleAdmin = () => {
		navigate("/admin");
	}


	return (
		<div className={styles.principalContainerHeader}>
			<div className={styles.containerButtonsHeader}>
				<div
					className={styles.menuIconMobile}
					onClick={() => setMenuOpen(!menuOpen)}>
					&#9776;
				</div>
				<div></div>
				<div className={styles.containerFilterButtonsHeader}>
					<button onClick={handleProductsCatalog}>Hombres</button>
					<div className={styles.principalButton}>
						<button onClick={() => navigate("/")}>RuneShop</button>
					</div>
					<button onClick={handleAdmin}>Mujeres</button>
				</div>
				<div className={styles.containerFilterUserButtonsHeader}>
					<button onClick={() => setCartOpen(true)}>
						<span className="material-symbols-outlined">shopping_cart</span>
					</button>
					<button onClick={() => setLoginOpen(true)}>
						<span className="material-symbols-outlined">account_circle</span>
					</button>
				</div>
			</div>

			{menuOpen && (
				<div className={styles.mobileMenu}>
					<button onClick={() => navigate("/")}>RuneShop</button>
					<button onClick={handleProductsCatalog}>Hombres</button>
					<button onClick={handleAdmin}>Mujeres</button>
				</div>
			)}

			{loginOpen && (
				<Login onCloseLogin={handleCloseLogin}/>)}

			{cartOpen && (
				<Cart onCloseCart={handleCloseCart} />
			)}
		</div>
	);
};
