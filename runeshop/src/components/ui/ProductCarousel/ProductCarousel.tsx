import React, { useEffect, useState } from "react";
import styles from "./ProductCarousel.module.css";
import { useNavigate } from "react-router";
import { getAllProductosController } from "../../../controllers/ProductoController";
import type { IProductoGet } from "../../../types/IProductoGet";

interface IVisibleProduct {
	id: number;
	name: string;
	precio: number;
	precio_descuento?: number | null;
	imagen: string;
}

export const ProductCarousel = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [numVisible, setNumVisible] = useState(
		window.innerWidth >= 1150 ? 5 : 3
	);
	const [isHovered, setIsHovered] = useState(false);
	const [products, setProducts] = useState<IProductoGet[] | null>(null);
	const [simplifiedProducts, setSimplifiedProducts] = useState<
		IVisibleProduct[] | null
	>(null);

	const navigate = useNavigate();

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const data = await getAllProductosController();
				if (data) {
					setProducts(data);
				} else {
				}
			} catch (error) {
			}
		};

		fetchProducts();
	}, []);

	useEffect(() => {
		if (products) {
			const cleared = products
				.filter(
					(product) =>
						Array.isArray(product.detalles) && product.detalles.length > 0
				)
				.map((product) => {
					const detalle = product.detalles[0];
					return {
						id: product.id!,
						name: product.modelo,
						precio: detalle?.precio?.precioVenta ?? 0,
						precio_descuento: detalle?.precio_descuento ?? null,
						imagen: detalle?.imagenes?.[0]?.imagenUrl ?? "",
					};
				});
			setSimplifiedProducts(cleared);
		}
	}, [products]);


	useEffect(() => {
		const updateNumVisible = () => {
			setNumVisible(window.innerWidth >= 1024 ? 5 : 3);
		};

		window.addEventListener("resize", updateNumVisible);
		return () => window.removeEventListener("resize", updateNumVisible);
	}, []);

	useEffect(() => {
		if (!simplifiedProducts || simplifiedProducts.length === 0 || isHovered)
			return;

		const interval = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % simplifiedProducts.length);
		}, 400000);

		return () => clearInterval(interval);
	}, [simplifiedProducts, isHovered]);

	const handlePrev = () => {
		if (!simplifiedProducts) return;
		setCurrentIndex(
			(prev) =>
				(prev - 1 + simplifiedProducts.length) % simplifiedProducts.length
		);
	};

	const handleNext = () => {
		if (!simplifiedProducts) return;
		setCurrentIndex((prev) => (prev + 1) % simplifiedProducts.length);
	};

	const handleProductClick = (id: number, isCenter: boolean) => {
		if (isCenter) {
			navigate(`/product/${id}`);
		}
	};

	const getVisibleProducts = () => {
		if (!simplifiedProducts || simplifiedProducts.length === 0) return [];

		const total = simplifiedProducts.length;
		const half = Math.floor(numVisible / 2);
		const indices = [];

		if (total <= numVisible) {
			return simplifiedProducts.map((product, index) => ({
				index,
				product,
				position: index - Math.floor(total / 2),
			}));
		}

		for (let i = -half; i <= half; i++) {
			let idx = (currentIndex + i + total) % total;
			indices.push({
				index: idx,
				product: simplifiedProducts[idx],
				position: i, 
			});
		}

		return indices;
	};

	const visibleProducts = getVisibleProducts();

	return (
		<div className={styles.carouselContainer}>
			{simplifiedProducts && simplifiedProducts.length > 0 ? (
				<>
					<button className={styles.navButton} onClick={handlePrev}>
						<span className="material-symbols-outlined">chevron_left</span>
					</button>

					<div className={styles.carouselTrack}>
						{visibleProducts.map(({ index, product }) => {
							const isCenter = index === currentIndex;
							const positionIndex =
								visibleProducts.findIndex((item) => item.index === index) -
								Math.floor(numVisible / 2);

							return (
								<div
									key={`${product.id}-${index}`}
									className={`${styles.carouselItem} ${
										isCenter ? styles.active : ""
									}`}
									onClick={() => handleProductClick(product.id, isCenter)}
									onMouseEnter={() => isCenter && setIsHovered(true)}
									onMouseLeave={() => isCenter && setIsHovered(false)}
									style={{
										cursor: isCenter ? "pointer" : "default",
										order: positionIndex + Math.floor(numVisible / 2),
									}}
								>
									<img className={isCenter ? styles.activeImg : ""} src={product.imagen} alt={product.name} />
									<p>{product.name}</p>
									{product.precio_descuento ? (
										<p>
											<span className={styles.oldPrice}>${product.precio.toLocaleString("es-AR")}</span>
											<span className={styles.discountPrice}>${product.precio_descuento.toLocaleString("es-AR")}</span>
										</p>
									) : (
										<p>${product.precio.toLocaleString("es-AR")}</p>
									)}
								</div>
							);
						})}
					</div>

					<button className={styles.navButton} onClick={handleNext}>
						<span className="material-symbols-outlined">chevron_right</span>
					</button>
				</>
			) : (
				<p>No hay productos disponibles.</p>
			)}
		</div>
	);
};
