import { useState } from "react";
import styles from "./Admin.module.css";
import { AdminModal } from "../AdminModal/AdminModal";
import { AddStockModal } from "../AddStockModal/AddStockModal";
export const Admin = () => {
	const [openDetails, setOpenDetails] = useState(false);
	const [openAddStockModal, setOpenAddStockModal] = useState(false);

	const handleOpenDetails = () => {
		setOpenDetails(true);
	};

	const handleCloseDetails = () => {
		setOpenDetails(false);
	};

	const handleOpenAddStockModal = () => {
		setOpenAddStockModal(true);
	};

	const handleCloseAddStockModal = () => {
		setOpenAddStockModal(false);
	};

	const asideButtons = () => {
		return (
			<>
				<button onClick={handleOpenDetails} className={styles.buttonAdmin}>
					<span className="material-symbols-outlined">visibility</span>
				</button>
				<button
					onClick={handleOpenAddStockModal}
					className={styles.buttonAdmin}>
					<span className="material-symbols-outlined">add</span>
				</button>
				<button className={styles.buttonAdmin}>
					<span className="material-symbols-outlined">delete</span>
				</button>
			</>
		);
	};

	return (
		<div className={styles.principalContainerAdmin}>
			<div className={styles.containerAdmin}>
				<div className={styles.adminTableContainer}>
					<table>
						<thead>
							<tr>
								<th>Modelo del producto</th>
								<th>Color</th>
								<th>Precio</th>
								<th>Stock disponible</th>
								<th>Acciones</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Producto 1</td>
								<td>Rojo</td>
								<td>$100000</td>
								<td>10</td>
								<td>{asideButtons()}</td>
							</tr>
							<tr>
								<td>Producto 1</td>
								<td>Rojo</td>
								<td>$100000</td>
								<td>10</td>
								<td>{asideButtons()}</td>
							</tr>
							<tr>
								<td>Producto 1</td>
								<td>Rojo</td>
								<td>$100000</td>
								<td>10</td>
								<td>{asideButtons()}</td>
							</tr>
							<tr>
								<td>Producto 1</td>
								<td>Rojo</td>
								<td>$100000</td>
								<td>10</td>
								<td>{asideButtons()}</td>
							</tr>
							<tr>
								<td>Producto 1</td>
								<td>Rojo</td>
								<td>$100000</td>
								<td>10</td>
								<td>{asideButtons()}</td>
							</tr>
							<tr>
								<td>Producto 1</td>
								<td>Rojo</td>
								<td>$100000</td>
								<td>10</td>
								<td>{asideButtons()}</td>
							</tr>
							<tr>
								<td>Producto 1</td>
								<td>Rojo</td>
								<td>$100000</td>
								<td>10</td>
								<td>{asideButtons()}</td>
							</tr>
							<tr>
								<td>Producto 1</td>
								<td>Rojo</td>
								<td>$100000</td>
								<td>10</td>
								<td>{asideButtons()}</td>
							</tr>
							<tr>
								<td>Producto 1</td>
								<td>Rojo</td>
								<td>$100000</td>
								<td>10</td>
								<td>{asideButtons()}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			{openDetails && <AdminModal onCloseAdminModal={handleCloseDetails} />}
			{openAddStockModal && (
				<AddStockModal onCloseAddStockModal={handleCloseAddStockModal} />
			)}
		</div>
	);
};
