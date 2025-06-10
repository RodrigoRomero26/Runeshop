import { useEffect, useState } from "react";
import styles from "./ProductsCatalog.module.css";
import { getProductosController } from "../../../controllers/ProductoController";
import type { IProductoGet } from "../../../types/IProductoGet";
import { ProductCard } from "../ProductCard/ProductCard";
import { filtersStore } from "../../../store/filtersStore";


export const ProductsCatalog = () => {
	const [productos, setProductos] = useState<IProductoGet[]>([]);
	const [currentApiPage, setCurrentApiPage] = useState(0);
	const [displayedPage, setDisplayedPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const pageSize = 12;

	const {
		genero,
		tipoIndumentaria,
		categorias,
		marcas,
		talles,
		precioMin,
		precioMax,
		order, 
		modelo,
	} = filtersStore();

	useEffect(() => {
		const fetchProductos = async () => {
			let min = precioMin === "" ? null : precioMin;
			let max = precioMax === "" ? null : precioMax;

	
			if (min !== null && max === null) max = 99999999;
			if (min === null && max !== null) min = 0;

			const data = await getProductosController(
				{
					sexo: genero,
					tipoProducto: tipoIndumentaria,
					categoria: categorias,
					marca: marcas,
					talle: talles,
					min: min,
					max: max,
					modelo: modelo || undefined,
				},
				currentApiPage,
				pageSize,
				order
			);

			if (!data || !data.content || data.content.length === 0) {
				setProductos([]);
				setTotalPages(0);
			} else {
				setProductos(data.content);
				setTotalPages(data.page.totalPages);
			}
		};

		fetchProductos();
	}, [
		genero,
		tipoIndumentaria,
		categorias,
		marcas,
		talles,
		precioMin,
		precioMax,
		currentApiPage,
		order,
		modelo, 
	]);

	useEffect(() => {
		if (displayedPage > totalPages && totalPages > 0) {
			setDisplayedPage(totalPages);
			setCurrentApiPage(totalPages - 1);
		}
	}, [totalPages]);

	useEffect(() => {
		setCurrentApiPage(0);
		setDisplayedPage(1);
	}, [
		genero,
		tipoIndumentaria,
		categorias,
		marcas,
		talles,
		precioMin,
		precioMax,
	]);

	const handlePageChange = (newDisplayedPage: number) => {
		if (newDisplayedPage < 1 || newDisplayedPage > totalPages) return;
		setCurrentApiPage(newDisplayedPage - 1);
		setDisplayedPage(newDisplayedPage);
	};

	return (
		<div className={styles.principalContainerProductsCatalog}>
			<div className={styles.containerProductsCards}>
				<div className={styles.productsCardsHolder}>
					{productos.length === 0 ? (
						<p className={styles.noProductsMsg}>
							No hay productos que coincidan con los filtros seleccionados.
						</p>
					) : (
						productos.map((producto: IProductoGet) => (
							<ProductCard
								key={producto.id}
								producto={producto}
							/>
						))
					)}
				</div>
			</div>

			{totalPages > 1 && productos.length > 0 && (
				<div className={styles.pagination}>
					<button
						onClick={() => handlePageChange(displayedPage - 1)}
						disabled={displayedPage === 1}
						className={styles.pageButton}>
						Anterior
					</button>

					{Array.from({ length: totalPages }, (_, index) => {
						const pageNumber = index + 1;
						return (
							<button
								key={pageNumber}
								onClick={() => handlePageChange(pageNumber)}
								className={`${styles.pageButton} ${
									pageNumber === displayedPage ? styles.activePageButton : ""
								}`}>
								{pageNumber}
							</button>
						);
					})}

					<button
						onClick={() => handlePageChange(displayedPage + 1)}
						disabled={displayedPage === totalPages}
						className={styles.pageButton}>
						Siguiente
					</button>
				</div>
			)}
		</div>
	);
};
