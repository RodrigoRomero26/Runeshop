import { useState } from "react";
import styles from "./Header.module.css";
import { Login } from "../LoginModal/Login";

export const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const [loginOpen, setLoginOpen] = useState(false);

	const handleCloseLogin = () => {
		setLoginOpen(false);
	};


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
					<button onClick={() => console.log("/categoria/hombres")}>Hombres</button>
					<div className={styles.principalButton}>
						<button onClick={() => console.log("/")}>RuneShop</button>
					</div>
					<button onClick={() => console.log("/categoria/mujeres")}>Mujeres</button>
					<button onClick={() => console.log("/categoria/ninos")}>Niños</button>
				</div>
				<div className={styles.containerFilterUserButtonsHeader}>
					<button onClick={() => console.log("/carrito")}>
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
		</div>
	);
};
