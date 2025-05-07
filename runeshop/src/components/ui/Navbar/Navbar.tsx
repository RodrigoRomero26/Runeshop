import styles from './Navbar.module.css';

export const Navbar = () => {
	return (
		<div className={styles.principalContainerNavbar}>
			<div className={styles.containerButtonsNavbar}>
				<button>Destacado</button>
				<button>Hombres</button>
				<button>RuneShop</button>
				<button>Mujeres</button>
				<button>Niños</button>
			</div>
		</div>
	);
};
