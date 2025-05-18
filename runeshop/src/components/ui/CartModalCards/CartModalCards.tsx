import styles from "./CartModalCards.module.css";

export const CartModalCards = () => {
	return (
		<div className={styles.cardWrapper}>
			<div className={styles.topSection}>
				<div className={styles.containerImageProductCart}>
					<img
						src="https://imgs.search.brave.com/1EuIsDeRffUn4TbvODgTEofZPv4x2vot022dkxpGAbQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kYXNo/LnZ0ZXhhc3NldHMu/Y29tL2FycXVpdm9z/L2lkcy8xNTE4NTM1/LTUwMC1hdXRvP3Y9/NjM4NjI5NjAwNjg4/OTMwMDAwJndpZHRo/PTUwMCZoZWlnaHQ9/YXV0byZhc3BlY3Q9/dHJ1ZQ"
						alt="Product"
					/>
				</div>
				<div className={styles.containerInfoProductCart}>
					<h2>Nombre zapatillas</h2>
					<p>Talle: 42</p>
				</div>
				<button className={styles.buttonDelete}>
					<span className="material-symbols-outlined">delete</span>
				</button>
			</div>
			<div className={styles.bottomSection}>
				<div className={styles.containerAmountProductCart}>
					<button className={styles.buttonAmount}>
						<span className="material-symbols-outlined">add</span>
					</button>
					<p>1</p>
					<button className={styles.buttonAmount}>
						<span className="material-symbols-outlined">remove</span>
					</button>
				</div>
				<p className={styles.price}>$150.000</p>
			</div>
		</div>
	);
};
