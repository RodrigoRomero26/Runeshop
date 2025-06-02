import { create } from "zustand";
import type { IProducto } from "../types/IProducto";

interface IProductsStore {
	products: IProducto[];
	productsCart: IProducto[];
	setArrayProducts: (products: IProducto[]) => void;
	activeProduct: IProducto | null;
	setActiveProduct: (product: IProducto | null) => void;
	addProduct: (product: IProducto) => void;
	updateProduct: (product: IProducto) => void;
	deleteProduct: (id: number) => void;
}

export const productsStore = create<IProductsStore>((set) => ({
	products: [],
	setArrayProducts: (productsArray) => set(() => ({ products: productsArray })),
	productsCart: [],
	activeProduct: null,
	setActiveProduct: (activeProductIn) =>
		set(() => ({ activeProduct: activeProductIn })),
	addProduct: (newproduct) =>
		set((state) => ({ products: [...state.products, newproduct] })),
	updateProduct: (updatedProduct) =>
		set((state) => {
			const updatedProducts = state.products.map((productA) =>
				productA.id === updatedProduct.id
					? { ...productA, ...updatedProduct }
					: productA
			);
			return { products: updatedProducts };
		}),
	deleteProduct: (productId) =>
		set((state) => {
			const updatedProducts = state.products.filter((p) => p.id !== productId);
			return { products: updatedProducts };
		}),
}));
