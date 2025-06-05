import { useEffect, useRef, useState, type FC } from "react";
import styles from "./Header.module.css";
import { Login } from "../LoginModal/Login";
import { Cart } from "../CartModal/Cart";
import { useNavigate } from "react-router";

interface HeaderProps {
	onCloseHeader: () => void;
}

export const Header: FC<HeaderProps> = ({ onCloseHeader }) => {
	const [menuOpen, setMenuOpen] = useState(false);
	const [loginOpen, setLoginOpen] = useState(false);
	const [cartOpen, setCartOpen] = useState(false);
	const [userMenuOpen, setUserMenuOpen] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(true);

	const navigate = useNavigate();

	const handleCloseLogin = () => {
		setLoginOpen(false);
	};

	const handleCloseCart = () => {
		setCartOpen(false);
	};

	const handleProductsCatalog = () => {
		navigate("/productsCatalog");
	};

	const handleAdmin = () => {
		navigate("/admin");
	};

	const menuRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setMenuOpen(false);
			}
		};

		if (menuOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [menuOpen]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setUserMenuOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	useEffect(() => {
		const token = localStorage.getItem("token");
		setIsLoggedIn(!!token);
	}, []);

	useEffect(() => {
		if (!isLoggedIn) {
			setMenuOpen(false);
			setUserMenuOpen(false);
		}
	}, [isLoggedIn]);

	const handleLogout = () => {
		localStorage.removeItem("token");
		setIsLoggedIn(false);
		setMenuOpen(false);
		navigate("/");
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
					{isLoggedIn ? (
						<div ref={menuRef} className={styles.userMenuWrapper}>
							<button onClick={() => setUserMenuOpen(!menuOpen)}>
								<span className="material-symbols-outlined">how_to_reg</span>
							</button>
							{userMenuOpen && (
								<div className={styles.userDropdownMenu}>
									<button onClick={() => navigate("/userProfile")}>Perfil</button>
									<button
										onClick={() => {
											handleLogout();
										}}>
										Cerrar sesión
									</button>
								</div>
							)}
						</div>
					) : (
						<button onClick={() => setLoginOpen(true)}>
							<span className="material-symbols-outlined">person</span>
						</button>
					)}
				</div>
			</div>

			{menuOpen && (
				<div className={styles.mobileMenu} ref={menuRef}>
					<button onClick={() => navigate("/")}>RuneShop</button>
					<button onClick={handleProductsCatalog}>Hombres</button>
					<button onClick={handleAdmin}>Mujeres</button>
				</div>
			)}

			{loginOpen && <Login onCloseLogin={handleCloseLogin} />}

			{cartOpen && <Cart onCloseCart={handleCloseCart} />}
		</div>
	);
};
