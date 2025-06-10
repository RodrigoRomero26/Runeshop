import { useEffect, useState } from "react";
import styles from "./Admin.module.css";
import { AdminModal } from "../AdminModal/AdminModal";
import { AddStockModal } from "../AddStockModal/AddStockModal";
import { getProductosController } from "../../../controllers/ProductoController";
import { filtersStore } from "../../../store/filtersStore";
import type { IProductoGet } from "../../../types/IProductoGet";
import type { IDetalle } from "../../../types/IDetalle";

export const Admin = () => {
	const [openDetailsId, setOpenDetailsId] = useState<number | null>(null);
	const [openAddStockId, setOpenAddStockId] = useState<number | null>(null);
	const [productos, setProductos] = useState<IProductoGet[]>([]);
	const filtros = filtersStore();

	useEffect(() => {
		const fetchProductos = async () => {
			const data = await getProductosController({
				sexo: filtros.genero,
				tipoProducto: filtros.tipoIndumentaria,
				categoria: filtros.categorias,
				marca: filtros.marcas,
				talle: filtros.talles,
				min: filtros.precioMin === "" ? null : filtros.precioMin,
				max: filtros.precioMax === "" ? null : filtros.precioMax,
				nombre: filtros.nombre,
			});
			setProductos(data?.content || []);
		};
		fetchProductos();
	}, [
		filtros.genero,
		filtros.tipoIndumentaria,
		filtros.categorias,
		filtros.marcas,
		filtros.talles,
		filtros.precioMin,
		filtros.precioMax,
		filtros.nombre,
	]);

	const asideButtons = (detalleId: number) => (
		<div className={styles.adminButtons}>
			<button
				onClick={() => setOpenDetailsId(detalleId)}
				className={styles.buttonAdmin}>
				<span className="material-symbols-outlined">visibility</span>
			</button>
			<button
				onClick={() => setOpenAddStockId(detalleId)}
				className={styles.buttonAdmin}>
				<span className="material-symbols-outlined">add</span>
			</button>
			<button className={styles.buttonAdmin}>
				<span className="material-symbols-outlined">delete</span>
			</button>
		</div>
	);

	// Busca el detalle correspondiente según el id seleccionado
	const detalleSeleccionado = productos
		.flatMap((p) => p.detalles)
		.find((d) => d.id === openDetailsId);

	const detalleAddStock = productos
		.flatMap((p) => p.detalles)
		.find((d) => d.id === openAddStockId);

	return (
		<div className={styles.principalContainerAdmin}>
			<div className={styles.adminLayout}>
				<div className={styles.containerAdmin}>
					<div className={styles.adminTableContainer}>
						<table>
							<thead>
								<tr>
									<th>Modelo del producto</th>
									<th>Color</th>
									<th>Talle</th>
									<th>Precio</th>
									<th>Stock disponible</th>
									<th>Acciones</th>
								</tr>
							</thead>
							<tbody>
								{productos.length === 0 ? (
									<tr>
										<td colSpan={6}>No hay productos para mostrar.</td>
									</tr>
								) : (
									productos.map((producto: IProductoGet) =>
										producto.detalles?.map((detalle: IDetalle) => (
											<tr key={detalle.id}>
												<td>{producto.modelo}</td>
												<td>{detalle.color}</td>
												<td>{detalle.talle.numero}</td>
												<td>${detalle.precio.precioVenta}</td>
												<td>{detalle.stock}</td>
												<td>{asideButtons(detalle.id!)}</td>
											</tr>
										))
									)
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
			{openDetailsId && detalleSeleccionado && (
				<AdminModal
					detalle={detalleSeleccionado}
					onCloseAdminModal={() => setOpenDetailsId(null)}
				/>
			)}
			{openAddStockId && detalleAddStock && (
				<AddStockModal
					detalle={detalleAddStock}
					onCloseAddStockModal={() => setOpenAddStockId(null)}
				/>
			)}
		</div>
	);
};
