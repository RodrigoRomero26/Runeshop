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
					<button onClick={() => console.log("/descuento")}>Descuentos</button>
					<button onClick={handleProductsCatalog}>Hombres</button>
					<div className={styles.principalButton}>
						<button onClick={() => navigate("/")}>RuneShop</button>
					</div>
					<button onClick={() => console.log("/categoria/mujeres")}>Mujeres</button>
					<button onClick={() => console.log("/categoria/ninos")}>Niños</button>
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
					<button onClick={() => console.log("/")}>RuneShop</button>
					<button onClick={() => console.log("/categoria/hombres")}>Hombres</button>
					<button onClick={() => console.log("/categoria/mujeres")}>Mujeres</button>
					<button onClick={() => console.log("/categoria/ninos")}>Niños</button>
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
