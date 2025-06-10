import { type FC } from "react";
import styles from "./AddStockModal.module.css";
import type { IDetalle } from "../../../types/IDetalle";

interface AddStockModalProps {
    onCloseAddStockModal: () => void;
	detalle: IDetalle;
}

export const AddStockModal: FC<AddStockModalProps> = ({onCloseAddStockModal, detalle}) => {

	return (
		<div className={styles.overlay}>
			<div className={styles.principalContainerAddStockModal}>
				<div className={styles.containerDataAddStockModal}>
					<div className={styles.containerTitleAddStockModal}>
						<h1>Añadir Stock</h1>
					</div>
					<div className={styles.inputContainer}>
						<input
							type="number"
							name="stockToAdd"
							placeholder="Cantidad de stock a agregar"
						/>
					</div>
					<div className={styles.containerButtonAddStockModal}>
						<button>Añadir</button>
						<button onClick={onCloseAddStockModal}>Cancelar</button>
					</div>
				</div>
			</div>
		</div>
	);
};
