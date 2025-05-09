import styles from "./Header.module.css";
export const Header = () => {
	return (
		<div className={styles.principalContainerHeader}>
			<div className={styles.containerButtonsHeader}>
				<div></div>
				<div className={styles.containerFilterButtonsHeader}>
					<button>Destacado</button>
					<button>Hombres</button>
					<div className={styles.principalButton}>
						<button>RuneShop</button>
					</div>

					<button>Mujeres</button>
					<button>Niños</button>
				</div>
				<div className={styles.containerFilterButtonsHeader}>
					<button>Carrito</button>
					<button>Cuenta</button>
				</div>
			</div>
		</div>
	);
};
